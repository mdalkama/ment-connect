import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.orm import relationship
from flask_login import LoginManager
from flask_login import login_required
from flask_login import login_user
from flask_login import UserMixin
from flask_login import current_user
from flask_login import logout_user




app = Flask(__name__)

app.config['SECRET_KEY'] = os.urandom(24).hex()
CORS(app, )
login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = 'login'

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Many-to-Many Relationship Table
user_tags = db.Table(
    'user_tags',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

# User Model
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Hashed Password
    tags = relationship('Tag', secondary=user_tags, back_populates='users', lazy='dynamic')

# Tag Model
class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    users = relationship('User', secondary=user_tags, back_populates='tags')

# Create Tables
with app.app_context():
    db.create_all()

# Register Route (Fixed)
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        existing_user = User.query.filter(
            (User.email == data['email']) | (User.phone == data['phone'])
        ).first()
        
        if existing_user:
            return jsonify({"error": "User with this email or phone already exists"}), 400
        
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_user = User(
            name=data['name'],
            role = data['role'],
            email=data['email'],
            phone=data['phone'],
            password=hashed_password  
        )

        # Process tags
        tag_names = data.get('tags', [])
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            new_user.tags.append(tag)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully", "tags": tag_names}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400







@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    

# Route for Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user, remember=True)
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Route for Dashboard (Protected)
@app.route('/dashboard')
@login_required
def dashboard():
    return jsonify({
        "message": "Welcome to your dashboard!",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }), 200

# Route for Logout
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    if not current_user.is_authenticated:
        return jsonify({"error": "Not logged in"}), 401
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200






# Test Route
@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

# Run Server
if __name__ == '__main__':
    app.run(debug=True)
