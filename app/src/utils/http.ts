import axios from "axios";

export const getInternshipListings = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/internships", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return [];
  }
};

export const getInternshipListing = async (id: string) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/internships/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return {};
  }
};

export const createInternshipListing = async () => {
  try {
    await axios.post("http://localhost:3000/api/internships", {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not create internship listing" };
  }
};

export const editInternshipListing = async (id: string) => {
  try {
    await axios.put(`http://localhost:3000/api/internships/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not edit internship listing" };
  }
};

export const deleteInternshipListing = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3000/api/internships/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not delete internship listing" };
  }
};

export const getCompanies = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/companies", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return [];
  }
};

export const getCompany = async (id: string) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/companies/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return {};
  }
};

export const createCompany = async () => {
  try {
    await axios.post("http://localhost:3000/api/companies", {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not create company" };
  }
};

export const editCompany = async (id: string) => {
  try {
    await axios.put(`http://localhost:3000/api/companies/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not edit company" };
  }
};

export const deleteCompany = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3000/api/companies/${id}`, {
      withCredentials: true,
    });
  } catch (e) {
    return { error: e, message: "Could not delete company" };
  }
};
