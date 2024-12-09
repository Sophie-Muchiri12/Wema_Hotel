class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///wemahotel.db'  # Change to your database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = '6e60f334ca270f07cff4b7d87b581d4d'  # Change to a strong secret in production