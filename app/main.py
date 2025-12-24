from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal
from schemas import ItemCreate, ItemUpdate, ItemOut

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/items", response_model=list[ItemOut])
def get_items(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT id, name FROM items"))
    return result.mappings().all()


@app.post("/api/items", status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db.execute(
        text("INSERT INTO items (name) VALUES (:name)"),
        {"name": item.name}
    )
    db.commit()
    return {"status": "added"}


@app.put("/api/items/{item_id}")
def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    result = db.execute(
        text("UPDATE items SET name = :name WHERE id = :id"),
        {"name": item.name, "id": item_id}
    )
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    db.commit()
    return {"status": "updated"}


@app.delete("/api/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    result = db.execute(
        text("DELETE FROM items WHERE id = :id"),
        {"id": item_id}
    )
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    db.commit()


@app.get("/api/db-check")
def db_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"db": "connected"}

