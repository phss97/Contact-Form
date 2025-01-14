import React, { useState } from 'react';
import { useIntegrationApp } from '@integration-app/react';
import './ContactCreationForm.css';
import hubspotLogo from './assets/hubspotLogo.png';

function ContactCreationForm() {
  const integrationApp = useIntegrationApp();

  // State to manage form data
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    primaryEmail: '',
    primaryPhone: '',
    companyName: '',
    pronoun: 'He' // Default value for pronoun
  });

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to store the contact ID
  const [contactId, setContactId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Automatically combine first + last into fullName
      const fullName = `${contactData.firstName} ${contactData.lastName}`.trim();

      // Build the payload to send to HubSpot
      const payload = {
        ...contactData,
        fullName
      };

      console.log('Submitting contact data:', payload);

      // Call the Integration App action
      const response = await integrationApp
        .connection('hubspot')
        .flow('create-contact')
        .run({input: payload});

      console.log('API Response:', response);
      alert(`Contact created successfully: ${JSON.stringify(response)}`);

      // Set the contact ID from the response
      setContactId(response.id);
    } catch (error) {
      console.error('Error creating contact:', error);
      alert('Failed to create contact. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle HubSpot connection
  const handleConnect = async () => {
    try {
      await integrationApp.integration('hubspot').openNewConnection();
      alert('Connected to HubSpot successfully!');
    } catch (error) {
      console.error('Error connecting to HubSpot:', error);
      alert('Failed to connect to HubSpot. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>HubSpot Contact Form</h2>
      <p className="form-description">
        Fill out the form to create a contact on HubSpot.
      </p>

      <div className="button-row">
        <button className="connect-button" onClick={handleConnect}>
        Connect to HubSpot
          <img 
            src={hubspotLogo} 
            alt="HubSpot logo" 
            className="hubspot-logo"
          />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* First/Last Name in one row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={contactData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={contactData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="pronoun">Pronoun</label>
          <select
            id="pronoun"
            name="pronoun"
            value={contactData.pronoun}
            onChange={handleChange}>
              <option value="He">He</option>
              <option value="She">She</option>
              <option value="They">They</option>
          </select>
          </div>
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="primaryEmail">Email</label>
          <input
            id="primaryEmail"
            type="email"
            name="primaryEmail"
            value={contactData.primaryEmail}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="primaryPhone">Phone</label>
          <input
            id="primaryPhone"
            type="tel"
            name="primaryPhone"
            value={contactData.primaryPhone}
            onChange={handleChange}
          />
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={contactData.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="button-row">
          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Contact'}
          </button>
        </div>
      </form>

      {contactId && (
        <div className="contact-link">
          <a
            href={`https://app.hubspot.com/contacts/48871604/record/0-1/${contactId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Contact
          </a>
        </div>
      )}
    </div>
  );
}

export default ContactCreationForm;
