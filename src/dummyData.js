export const propertyInfo = {
  street: "133 Perry St",
  city: "Mapleville",
  state: "South Carolina",
  zip: "11001",
};

export const tenant = {
  id: 1,
  first_name: "Jane",
  last_name: "Dane",
  username: "testing@test.com",
  password: "Password",
  phone_number: "1234567890",
};

// merge later?
export const contract = {
  id: 0,
  unit_id: 4,
  monthly_rent: 500,
  lease_starting_from: "2023-01-01",
  lease_ending_on: null,
  renter_id: 1,
};

export const tenants = [
  {
    id: 0,
    first_name: "John",
    last_name: "Doe",
    username: "testing@test.com",
    password: "Password",
    phone_number: "1234567890",
  },
  {
    id: 1,
    first_name: "Jane",
    last_name: "Dane",
    username: "testing@test.com",
    password: "Password",
    phone_number: "1234567890",
  },
  {
    id: 2,
    first_name: "Joey",
    last_name: "Doey",
    username: "testing@test.com",
    password: "Password",
    phone_number: "1234567890",
  },
];

export const landlord = [
  {
  id: 1,
  first_name: "Bubba",
  last_name: "Gump",
  username: "bubbabuildings@test.com",
  password: "Password",
  phone_number: "1234567890",
  }
];

export const tenantPaymentHistory = [
  {
    id: 0,
    contract_id: 0,
    amount_paid: 500,
    payment_date: "2023-01-01",
    payment_medium: "Credit Card",
  },
  {
    id: 1,
    amount_paid: 500,
    contract_id: 0,
    payment_date: "2023-02-02",
    payment_medium: "Credit Card",
  },
  {
    id: 2,
    contract_id: 0,
    amount_paid: 500,
    payment_date: "2023-03-01",
    payment_medium: "Credit Card",
  },
  {
    id: 3,
    contract_id: 0,
    amount_paid: 500,
    payment_date: "2023-04-01",
    payment_medium: "Credit Card",
  },
];

export const contracts = [
  {
    id: 0,
    unit_id: 0,
    monthly_rent: 500,
    lease_starting_from: "2023-01-01",
    lease_ending_on: "2023-12-31",
    tenant_id: 0,
    landlord_id: 1,
  },
  {
    id: 1,
    unit_id: 1,
    monthly_rent: 500,
    lease_starting_from: "2023-01-01",
    lease_ending_on: "2023-12-31",
    tenant_id: 1,
    landlord_id: 1,
  },
  {
    id: 2,
    unit_id: 2,
    monthly_rent: 500,
    lease_starting_from: "2023-01-01",
    lease_ending_on: "2023-12-31",
    tenant_id: 2,
    landlord_id: 1,
  },
];

export const unit = [
  {
    id: 0,
    is_available: false,
    landlord_id: 1,
  },
  {
    id: 1,
    is_available: false,
    landlord_id: 1,
  },
  {
    id: 2,
    is_available: false,
    landlord_id: 1,
  },
];

export const rent_payment_log =[
  {
    id: 0,
    contract_id: 0,
    amount_paid: 500,
    payment_date: "2023-01-01",
    payment_medium: "Credit Card",
    check_number: "",
    online_transaction_number: "",
  },
  {
    id: 1,
    contract_id: 1,
    amount_paid: 500,
    payment_date: "2023-02-01",
    payment_medium: "eCheck",
    check_number: "01001",
    online_transaction_number: "",
  },
  {
    id: 2,
    contract_id: 2,
    amount_paid: 500,
    payment_date: "2023-03-01",
    payment_medium: "ACH Transfer",
    check_number: "",
    online_transaction_number: "137370531",
  }
];

