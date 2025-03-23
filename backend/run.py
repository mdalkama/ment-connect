import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.orm import relationship
from flask_login import LoginManager, login_required, login_user, UserMixin, current_user, logout_user

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24).hex()
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

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
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    is_online = db.Column(db.Boolean, default=False)
    tags = relationship('Tag', secondary=user_tags, back_populates='users', lazy='dynamic')

# Tag Model
class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    users = relationship('User', secondary=user_tags, back_populates='tags')

# Message Model
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    text = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create Tables
with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        existing_user = User.query.filter((User.email == data['email']) | (User.phone == data['phone'])).first()
        if existing_user:
            return jsonify({"error": "User with this email or phone already exists"}), 400
        
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            name=data['name'],
            role=data['role'],
            email=data['email'],
            phone=data['phone'],
            password=hashed_password  
        )
        
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

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing email or password"}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user, remember=True)
        return jsonify({"message": "Login successful!", "user": {"id": user.id, "name": user.name, "email": user.email}}), 200
    return jsonify({"error": "Invalid email or password"}), 401

# Logout Route
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

# Send Message Route
@app.route('/send_message', methods=['POST'])
@login_required
def send_message():
    data = request.get_json()
    if not data or 'receiver_id' not in data or 'text' not in data:
        return jsonify({"error": "Missing data"}), 400
    
    receiver = User.query.get(data['receiver_id'])
    if not receiver:
        return jsonify({"error": "Receiver not found"}), 404
    
    message = Message(sender_id=current_user.id, receiver_id=receiver.id, text=data['text'])
    db.session.add(message)
    db.session.commit()
    return jsonify({"message": "Message sent successfully", "text": message.text, "timestamp": message.timestamp}), 200

# Fetch Chat Route
@app.route('/chat/<int:receiver_id>', methods=['GET'])
@login_required
def get_chat(receiver_id):
    receiver = User.query.get(receiver_id)
    if not receiver:
        return jsonify({"error": "Receiver not found"}), 404
    
    messages = Message.query.filter(
        ((Message.sender_id == current_user.id) & (Message.receiver_id == receiver_id)) |
        ((Message.sender_id == receiver_id) & (Message.receiver_id == current_user.id))
    ).order_by(Message.timestamp).all()
    
    chat_history = [{"sender_id": msg.sender_id, "receiver_id": msg.receiver_id, "text": msg.text, "timestamp": msg.timestamp} for msg in messages]
    return jsonify({"chat": chat_history}), 200

# Update Presence Route
@app.route('/update_presence', methods=['POST'])
@login_required
def update_presence():
    current_user.last_seen = datetime.utcnow()
    current_user.is_online = True
    db.session.commit()
    return jsonify({"message": "Presence updated"}), 200

if __name__ == '__main__':
    app.run(debug=True)