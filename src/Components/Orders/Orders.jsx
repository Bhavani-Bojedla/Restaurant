import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('No token found, user is not authenticated');
          setLoading(false);
          return;
        }
        const [pendingOrdersResponse, servedOrdersResponse] = await Promise.all([
          axios.post('https://test-api.achilyon.in/v1/orders/all-orders', 
            { status: 'PENDING', is_cash: true },
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.post('https://test-api.achilyon.in/v1/orders/all-orders', 
            { status: 'SERVED', is_cash: true },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        ]);
        const pendingOrdersData =pendingOrdersResponse.data.data;
        const servedOrdersData = servedOrdersResponse.data.data ;
        const allOrders = [...pendingOrdersData, ...servedOrdersData];
        allOrders.sort((a, b) => a.order_version - b.order_version);
        setOrders(allOrders);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching orders. Please try again later.');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchOrders();
  }, []);
  
  return (
    <>
    <Box className='p-10 bg-red-50'>
      
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      {loading ? (
        <CircularProgress/>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {orders.length === 0 ? (
            <Typography variant="body1">No orders found</Typography>
          ) : (
            orders.map((order, index) => (
              <Grid item  sm={4} key={index}>
                <Card className={order.status === 'PENDING' ? 'flex flex-col h-full border-2 border-red-500 rounded-sm space-between ' : ' flex flex-col h-full border-2 border-green-500 rounded-sm space-between '}>
                  <CardContent className=''>
                   
                    <Box  className="flex justify-between pb-5 mb-2 border-b-2 border-red-300">
                      <Typography variant="h6"  sx={{ fontWeight: 'bold'}} className='text-gray-800'>Order Version: {order.order_version}</Typography>
                      <div>
                      <Typography variant=""   className={order.status === 'PENDING' ? 'text-red-600 font-bold' : 'text-green-500 font-bold'}><span className='font-semibold text-gray-800'>Status:</span> {order.status }</Typography>
                      <Typography variant="subtitle1" className=''>Cash Payment: {order.is_cash ? 'Yes' : 'No'}</Typography>
                      </div>
                    </Box>

                  
                    {order.items.map((item, itemIndex) => (
                      <Box key={itemIndex} mt={2} className="flex items-center justify-between px-5 pt-2 align-center" >
                        <div>
                        <div  className='text-lg text-blue-700'>
                          {item.menu_item.name}
                        </div>
                        <Typography className='text-gray-500'>Quantity: {item.quantity}</Typography>
                        <Typography className='text-gray-500'>Price: ${item.menu_item.price.toFixed(2)}</Typography>
                        <Typography className='text-gray-500'>Vegetarian: {item.menu_item.is_veg ? 'Yes' : 'No'}</Typography>
                        </div>
                        <img 
                          src={item.menu_item.imageId} 
                          alt={item.menu_item.name} 
                          className='w-24 h-28'
                          style={{ objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} 
                        />
                       
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
    </>
  );
};

export default Orders;


