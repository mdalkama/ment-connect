import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager, login_required, login_user, UserMixin, current_user, logout_user
from flask import session

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24).hex()
app.config["SESSION_TYPE"] = "filesystem"  # Stores sessions in files
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_USE_SIGNER"] = True  # Ensures secure cookies
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_FILE_DIR"] = "./flask_session"  # Store session files


app.config['SESSION_COOKIE_SECURE'] = True  # Needed for SameSite=None
app.config['SESSION_COOKIE_SAMESITE'] = "None"  # Change to "None" if using cross-site
app.config['REMEMBER_COOKIE_SECURE'] = True  # Required for persistence
app.config['REMEMBER_COOKIE_SAMESITE'] = "None"  # Or "None" for cross-origin
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

CORS(app, supports_credentials=True, origins="http://localhost:5173")

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = None

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
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], role=data['role'], email=data['email'], phone=data['phone'], password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


@app.before_request
def make_session_permanent():
    session.permanent = True

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user, remember=True)
        session.permanent = True  # Ensure session persists
        print(session)
        
        response = jsonify({"message": "Login successful!", "user": {"id": user.id, "name": user.name, "email": user.email}})
        print(response.headers)  # Print headers to check for Set-Cookie
        return response, 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  
    session.clear()  # Clear all session data  
    response = jsonify({"message": "Logged out successfully"})  
    response.set_cookie('session', '', expires=0)  # Expire session cookie  
    return response, 200

# Send Message Route
# Fetch all messages between current user and a specific user
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
    return jsonify(chat_history), 200

# Send a new message
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
    return jsonify({"message": "Message sent successfully"}), 200


@app.route("/protected_route", methods=["GET"])
def protected():
    print("🔹 SESSION DATA:", session)  # Debug session
    print("🔹 CURRENT USER:", current_user)  # Debug Flask-Login user

    if not current_user.is_authenticated:
        return jsonify({"message": "Not logged in"}), 401
    return jsonify({"message": "Authenticated", "user": current_user.get_id()})


if __name__ == '__main__':
    app.run(debug=True)
