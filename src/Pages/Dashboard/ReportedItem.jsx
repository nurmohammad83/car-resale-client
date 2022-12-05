import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading'
const ReportedItem = () => {
    const {data:reports,refetch,isLoading}=useQuery({
        queryKey:['report'],
        queryFn:async()=>{
            const res=await fetch(`https://car-resale-server-nurmohammad83.vercel.app/reports`)
            const data = await res.json()
            console.log(data);
            return data;
        }
    })
    
    const handelDeleting =(id)=>{
      fetch(`https://car-resale-server-nurmohammad83.vercel.app/cars/${id}`,{
        method:'DELETE',
        headers:{
          authorization:`bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
       if(data.deletedCount){
         refetch()
        toast.success('Delete Product from card Successfully')
       }
      })
    }
    if (isLoading) {
      <Loading/>
    }
    return (
        <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Product</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
        reports?.map(report=> <tr key={report._id}>
            <td>{report.userName}</td>
            <th>{report.productName}</th>
            <td>{report.email}</td>
            <td>
              <button onClick={()=>handelDeleting(report.reportId)} className='btn btn-accent max-w-xs'>Delete</button>
            </td>
          </tr>)
     }

    </tbody>
  </table>
</div>
    );
};

export default ReportedItem;