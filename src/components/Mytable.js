
import React from "react";
import { useEffect,useState } from "react";
import DataTable from "react-data-table-component"
import rawdata from "./datatables.json"
import "./Mytable.css"

const Mytable = () => {
    const[records,setrecords]=useState([])
    const[filterrecords,setfilterrecords]=useState("")
  
    const customStyles = {
        headRow:{
         style:{
    background:"#282b2d",
    color: "white",
    borderRadius:"10px"
         }
        },
        rows: {
            style: {
                minHeight: '72px',
                 // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'NAME',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'POSITION',
        selector: row => row.position,
        sortable: true,
    },
    {
        name: 'OFFICE',
        selector: row => row.office,
        sortable: true,
    },
    {
        name: 'AGE',
        selector: row => row.age,
        sortable: true,
    },
    {
        name: 'START DATE',
        selector: row => row.date,
        sortable: true,
    },
    {
        name: 'SALARY',
        selector: row => row.salary,
        sortable: true,
    },
];

  useEffect(()=>{
const fetDAta= async()=>{
    try{
        const jsondata =await rawdata
        setrecords(jsondata)
        setfilterrecords(jsondata)
    }
    catch(error){
        console.log(error)
    }
}
fetDAta()
  },[])


  const handlefilter=(event)=>{

    const namedata = filterrecords.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
    const positiondata = filterrecords.filter(row=>row.position.toLowerCase().includes(event.target.value.toLowerCase()))
    const datedata = filterrecords.filter(row=>row.date.toLowerCase().includes(event.target.value.toLowerCase()))
    const salarydata = filterrecords.filter(row=>row.salary.toLowerCase().includes(event.target.value.toLowerCase()))
    const agedata = filterrecords.filter(row=>row.age.toLowerCase().includes(event.target.value.toLowerCase()))
    const officedata = filterrecords.filter(row=>row.office.toLowerCase().includes(event.target.value.toLowerCase()))
      const tabledata =[...namedata,...positiondata,...datedata,...salarydata,...agedata,...officedata]
      
    //   let filteredarray = tabledata.filter((item,index,self)=>
    //   index === self.findIndex((obj)=>obj.name=== item.name && obj.position === item.position && obj.office=== item.office && obj.age=== obj.age && obj.date===item.date && obj.salary===item.salary)
    //   )
setrecords(tabledata)
  }
    
    
 
    return (
    <div className="table-body">

        <div style={{display:"flex", justifyContent:"right"}}>
            <div className="btn btn-dark">Search</div>
            <input className="form-control me-2" style={{width:"20%"}} type="text" placeholder="search..." onChange={handlefilter}/>
        </div>
        <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
            highlightOnHover

        />
    </div>
  )
}

export default Mytable