import axios from 'axios';

class LookupRequest {
  async getFrequencies() {
    const res = await axios.get('/api/lookups/frequencies');
    return res.data;
  }

  async getCurrencies() {
    const res = await axios.get('/api/lookups/currencies');
    return res.data;
  }

  async getStatuses() {
    const res = await axios.get('/api/lookups/statuses');
    return res.data;
  }
}

export default LookupRequest;
