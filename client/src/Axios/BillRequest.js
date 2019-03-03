import axios from 'axios';

class BillRequest {
  async getBills (search) {
    const res = await axios.get('/api/bills', {
      params: search
    });
    return res.data;
  }

  async getBill (billId) {
    const res = await axios.get('/api/bills/'+billId);
    return res.data;
  }

  async postBill(bill) {
    return await axios.post('/api/bills', bill);
  }

  async putBill(bill) {
    return await axios.put('/api/bills/'+bill._id, bill);
  }

  async deleteBill(bill) {
    return await axios.delete('/api/bills/'+bill._id);
  }
}

export default BillRequest;
