from flask import Flask, make_response
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS
from datetime import timedelta
from database import db
import os

# Initialize the database and migration objects
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS for all routes and allow credentials
    CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5000", "http://localhost:3000"], "methods": ["GET", "POST", "DELETE", "OPTIONS"], "supports_credentials": True}})

    
    app.config['SECRET_KEY'] = "6e60f334ca270f07cff4b7d87b581d4d"
    app.config.from_object(Config)
    
    # Ensure cookies can be shared across origins for sessions
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)
    app.config['SESSION_COOKIE_SAMESITE'] = "None"  # Necessary for cross-site cookie sharing
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production

    # Initialize the database and migration
    db.init_app(app)
    migrate.init_app(app, db)

    # Import routes
    from routes import create_routes
    create_routes(app,db)

    @app.after_request
    def after_request(response):
        print("Response Headers:", response.headers)  # Log headers for debugging
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response


    return app

if __name__ == "__main__":
    app = create_app()
    
    # Get the port from environment variables or default to 5000
    port = int(os.environ.get('PORT', 5000))

    # Log the port for debugging
    print(f"Running on port: {port}")

    # Bind to 0.0.0.0 and the specified port
    app.run(host='0.0.0.0', port=port)

    