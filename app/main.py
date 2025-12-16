from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/items")
def get_items(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT id, name FROM items"))
    return [{"id": r.id, "name": r.name} for r in result]


@app.post("/api/items")
def create_item(name: str, db: Session = Depends(get_db)):
    db.execute(
        text("INSERT INTO items (name) VALUES (:name)"),
        {"name": name}
    )
    db.commit()
    return {"status": "added"}


@app.put("/api/items/{item_id}")
def update_item(item_id: int, name: str, db: Session = Depends(get_db)):
    db.execute(
        text("UPDATE items SET name = :name WHERE id = :id"),
        {"name": name, "id": item_id}
    )
    db.commit()
    return {"status": "updated"}


@app.delete("/api/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db.execute(
        text("DELETE FROM items WHERE id = :id"),
        {"id": item_id}
    )
    db.commit()
    return {"status": "deleted"}

@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"db": "connected"}

