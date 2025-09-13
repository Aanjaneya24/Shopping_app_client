import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import {tokenconfig} from './authActions';
import { returnErrors } from './errorActions';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});


export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  api
    .get('/api/items')
    .then(res => {
      console.log('Items fetched successfully:', res.data);
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err => {
      console.error('Error fetching items:', err.response || err);
      dispatch(returnErrors(err.response?.data || 'Error fetching items', err.response?.status));
    });
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  const config = tokenconfig(getState);
  
  api
    .post('/api/items', item, config)
    .then(res => {
      console.log('Item added successfully:', res.data);
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err => {
      console.error('Error adding item:', err.response?.data);
      dispatch(returnErrors(err.response?.data || 'Error adding item', err.response?.status));
    });
};

export const deleteItem = (id) => (dispatch, getState) => {
  dispatch(setItemsLoading());
  
  // Get auth token
  const config = tokenconfig(getState);
  
  // Debug log
  console.log('Deleting item:', {
    id: id,
    token: config.headers['x-auth-token']
  });

  // Make sure we have a valid ID
  if (!id || typeof id !== 'string') {
    console.error('Invalid item ID:', id);
    return dispatch(returnErrors('Invalid item ID', 400));
  }

  api
    .delete(`/api/items/${id}`, { headers: config.headers })
    .then(res => {
      console.log('Delete response:', res.data);
      if (res.data.success) {
        dispatch({
          type: DELETE_ITEM,
          payload: id
        });
      } else {
        throw new Error(res.data.msg || 'Delete failed');
      }
    })
    .catch(err => {
      console.error('Delete failed:', {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      dispatch(returnErrors(
        err.response?.data?.msg || 'Error deleting item',
        err.response?.status
      ));
    });
  
  console.log('Attempting to delete item:', id);
  
  // Trim any whitespace from the ID
  const cleanId = id.toString().trim();
  
  api
    .delete(`/api/items/${cleanId}`, config)
    .then(res => {
      if (res.data.success) {
        console.log('Delete successful:', res.data);
        dispatch({
          type: DELETE_ITEM,
          payload: cleanId
        });
      } else {
        throw new Error('Delete operation failed');
      }
    })
    .catch(err => {
      console.error('Delete failed:', {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      dispatch(returnErrors(
        err.response?.data?.msg || 'Error deleting item',
        err.response?.status
      ));
    });
  
  // Add clear error handling and logging
  try {
    axios
      .delete(`/api/items/${id}`, config)
      .then(res => {
        dispatch({
          type: DELETE_ITEM,
          payload: id
        });
      })
      .catch(err => {
        console.error('Delete error details:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers,
          config: err.config
        });
        dispatch(returnErrors(err.response?.data || 'Error deleting item', err.response?.status));
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    dispatch(returnErrors('Unexpected error occurred', 500));
  }
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
