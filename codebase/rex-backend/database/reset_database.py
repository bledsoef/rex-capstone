from database.config import Base, engine
from sqlalchemy.orm import Session
from app.models.models import *
from datetime import datetime

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

with Session(engine) as session:
    finn = User(username="bledsoef", email="bledsoef@berea.edu", first_name="Finn", last_name="Bledsoe", created_at=datetime(2024, 4, 4), is_artist=False, account_type="paid")
    session.add_all([finn])
    session.commit()