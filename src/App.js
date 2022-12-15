import { useId, useState } from "react";
import "./App.css";
import List from "./List";
import {uid} from "uid";

function App() {

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Nanahoshi Ren",
      telp: "0101",
    },
    {
      id: 2,
      name: "Goryo Yuuto",
      telp: "0102",
    },
    {
      id: 3,
      name: "Matoba Wataru",
      telp: "0103",
    },
  ]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "Masukan Nama",
    telp: "Masukan Nomor Telpon",
  });

  // Ngubah data sesuai input
  function handleChange(e){
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    // data["name"] = "Test Value"
    setFormData(data);
  }

  // Ketika Form disubmit
  function handleSubmit(e){
    e.preventDefault();
    // alert("Oke Masuk");
    let data = [...contacts];

    //Validasi Form
    if((formData.name === "")){
      return false;
    }
    if((formData.telp === "")){
      return false;
    }

    if(isUpdate.status){
      data.forEach((contact) => {
        if(contact.id === isUpdate.id){
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });
    }
    else {
      data.push({id: uid(), name: formData.name, telp:formData.telp });
    }

    //Add New Contact
    //Install UID - Random ID Generator
    setIsUpdate({ id: null, status: false }); //Biar gak update data yang baru ditambah
    setContacts(data);
    setFormData({ name: "" , telp: "" });
  }

  function handleEdit(id){

    let data =[...contacts]; //Ambil seluruh data
    let foundData = data.find(contact => contact.id === id); //cari data berdasarkan ID
    setFormData({name: foundData.name, telp: foundData.telp}); //Set data berdasarkan data yang ditemui
    setIsUpdate({id: id, status: true }); //ngeset ID yang sedang di update
  }

  function handleDelete(id){
    let data = [...contacts];
    let filteredData = data.filter(contact => contact.id !== id);
    setContacts(filteredData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" 
          className="form-control"
          onChange={handleChange}
          value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input type="text" 
          className="form-control"
          onChange={handleChange}
          value={formData.telp} name="telp" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      {/* render data array kedalam komponen list */}
      <List 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        data={contacts} 
        /> 
    </div>
  );
}

export default App;
