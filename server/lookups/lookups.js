module.exports = class Lookups {
  async getFrequencies() {
    return await ['None', 'Daily', 'Weekly', 'Monthly',
                'Bi-Monthly', 'Quarterly', '3 Per Annum', 'Semi-Annual',
                'Annual'];
  }

  async getCurrencies() {
    return await [
      {code:'EGP', name:'Egyptian Pound'},
      {code:'USD', name:'American Dollar'}
    ];
  }

  async getStatuses() {
    return await ['Active', 'Inactive', 'Closed'];
  }
}
