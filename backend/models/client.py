from sqlmodel import SQLModel, Field

class ClientBase(SQLModel):
    name: str
    email: str
    number: str

class Client(ClientBase, table=True):
    id: int = Field(default=None, primary_key=True)
