import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from '@mui/material';

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('lastName');
  const [order, setOrder] = useState('asc');
  const [totalContacts, setTotalContacts] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, [page, rowsPerPage, orderBy, order]);

  const fetchContacts = async () => {
    const offset = page * rowsPerPage;
    const limit = rowsPerPage;
    const response = await axios.get(
      `/api/contacts`,
      {
        params: {
          offset: rowsPerPage * page,
          limit: rowsPerPage,
        },
      }
    );
    setContacts(response.data.contacts);
    setTotalContacts(response.data.total);

  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this contact?')){
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div className="contact-manager">
      <TableContainer component={Paper} className="contacts-table">
        <Table>
          <TableHead>
            <TableRow>
              {['name', 'email', 'phone', 'company', 'jobTitle'].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(contact._id)}
                    className="delete-button"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalContacts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

ContactManager.propTypes = {
  initialContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string,
      company: PropTypes.string,
      jobTitle: PropTypes.string,
    })
  ),
};