from database.config import Base, engine
from sqlalchemy.orm import Session
from app.models.User import User
from app.models.PendingRec import PendingRec
from datetime import datetime
from app.models.Rec import Rec

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

with Session(engine) as session:
    bledsoef = User(id=1, username="bledsoef", email="bledsoef@berea.edu", first_name="Finn", last_name="Bledsoe", created_at=datetime(2024, 4, 4), is_artist=False, account_type="paid")
    bahrs = User(id=2, username="bahrs", email="bahrs@berea.edu", first_name="Summer", last_name="Bahr", created_at=datetime(2024, 4, 4), is_artist=False, account_type="paid")
    rec_1 = Rec(id=1,
                title="Test",
                body="Super sweet song",
                sender_id=1,
                recipient_id=2,
                created_at=datetime(2024, 6, 5),
                song_id=1,
                is_post=False)
    
    pending_rec_1 = PendingRec(id=1, rec_id=1, updated=datetime(2024, 4, 4))
    session.add_all([bledsoef, bahrs])
    session.add_all([rec_1])
    session.add_all([pending_rec_1])
    session.commit()