import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    // new 
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`, {
            // new
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            // new
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push('/login');
                }
            })
            .then(data => {
                setOrders(data);
            })
    }, [])
    return (
        <div>
            <h2>Review Your Order Here</h2>
            <p>Total Order: {orders.length}</p>
            <ul>
                {orders.map(order => <li
                    key={order._id}
                >{order.name} : {order.email}</li>)}
            </ul>

        </div>
    );
};

export default Orders;