import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  sex: string;
  dateOfBirth: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  postalAddress: string;
  email: string;
  ndisNumber: string;
  planStartDate: string;
  planEndDate: string;
  planType: string;
  phoneNumber: string;
  mobileNumber: string;
  preferredLanguage: string;
  interpreterRequired: boolean;
  disability: string;
  specialRequirements: string;
  carerFirstName: string;
  carerLastName: string;
  carerPostalAddress: string;
  carerEmail: string;
  carerPhone: string;
  carerMobile: string;
  referrerFirstName: string;
  referrerLastName: string;
  referrerOrganization: string;
  referrerPosition: string;
  referrerContact: string;
  referrerPostalAddress: string;
  referrerEmail: string;
}

const Referral = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    preferredName: '',
    sex: '',
    dateOfBirth: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: '',
    postalAddress: '',
    email: '',
    ndisNumber: '',
    planStartDate: '',
    planEndDate: '',
    planType: '',
    phoneNumber: '',
    mobileNumber: '',
    preferredLanguage: '',
    interpreterRequired: false,
    disability: '',
    specialRequirements: '',
    carerFirstName: '',
    carerLastName: '',
    carerPostalAddress: '',
    carerEmail: '',
    carerPhone: '',
    carerMobile: '',
    referrerFirstName: '',
    referrerLastName: '',
    referrerOrganization: '',
    referrerPosition: '',
    referrerContact: '',
    referrerPostalAddress: '',
    referrerEmail: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false });

    try {
      await emailjs.send(
        'service_2jmrt88',
        'referral_form',
        {
          // Participant Details
          participant_name: `${formData.firstName} ${formData.lastName}`,
          preferred_name: formData.preferredName,
          sex: formData.sex,
          date_of_birth: formData.dateOfBirth,
          address: `${formData.streetAddress}${formData.streetAddress2 ? `, ${formData.streetAddress2}` : ''}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
          email: formData.email,
          ndis_number: formData.ndisNumber,
          plan_dates: `${formData.planStartDate} to ${formData.planEndDate}`,
          plan_type: formData.planType,
          phone: formData.phoneNumber,
          mobile: formData.mobileNumber,
          preferred_language: formData.preferredLanguage,
          interpreter_required: formData.interpreterRequired ? 'Yes' : 'No',
          disability: formData.disability,
          special_requirements: formData.specialRequirements,

          // Carer Details
          carer_name: `${formData.carerFirstName} ${formData.carerLastName}`,
          carer_address: formData.carerPostalAddress,
          carer_email: formData.carerEmail,
          carer_phone: formData.carerPhone,
          carer_mobile: formData.carerMobile,

          // Referrer Details
          referrer_name: `${formData.referrerFirstName} ${formData.referrerLastName}`,
          referrer_organization: formData.referrerOrganization,
          referrer_position: formData.referrerPosition,
          referrer_contact: formData.referrerContact,
          referrer_address: formData.referrerPostalAddress,
          referrer_email: formData.referrerEmail
        },
        'kTYrUHOc2sp_VvK8Q'
      );

      setStatus({ submitting: false, submitted: true, error: false });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        preferredName: '',
        sex: '',
        dateOfBirth: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        postalCode: '',
        postalAddress: '',
        email: '',
        ndisNumber: '',
        planStartDate: '',
        planEndDate: '',
        planType: '',
        phoneNumber: '',
        mobileNumber: '',
        preferredLanguage: '',
        interpreterRequired: false,
        disability: '',
        specialRequirements: '',
        carerFirstName: '',
        carerLastName: '',
        carerPostalAddress: '',
        carerEmail: '',
        carerPhone: '',
        carerMobile: '',
        referrerFirstName: '',
        referrerLastName: '',
        referrerOrganization: '',
        referrerPosition: '',
        referrerContact: '',
        referrerPostalAddress: '',
        referrerEmail: ''
      });

      alert('Referral form submitted successfully!');
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: true });
      alert('Failed to submit referral form. Please try again.');
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-teal-800 mb-8">Referral Form</h1>
          {status.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Failed to submit form. Please try again.</p>
            </div>
          )}
          {status.submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600">Form submitted successfully!</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Participant Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Participant Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Name</label>
                  <input
                    type="text"
                    name="preferredName"
                    value={formData.preferredName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
              </div>
            </section>

            {/* Address Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Address Details</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address Line 2</label>
                  <input
                    type="text"
                    name="streetAddress2"
                    value={formData.streetAddress2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      required
                      disabled={status.submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      required
                      disabled={status.submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      required
                      disabled={status.submitting}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* NDIS Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">NDIS Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NDIS Number</label>
                  <input
                    type="text"
                    name="ndisNumber"
                    value={formData.ndisNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                  <input
                    type="text"
                    name="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Start Date</label>
                  <input
                    type="date"
                    name="planStartDate"
                    value={formData.planStartDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan End Date</label>
                  <input
                    type="date"
                    name="planEndDate"
                    value={formData.planEndDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
              </div>
            </section>

            {/* Language and Disability */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Additional Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language/Dialect</label>
                  <input
                    type="text"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="interpreterRequired"
                      checked={formData.interpreterRequired}
                      onChange={handleChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      disabled={status.submitting}
                    />
                    <span className="ml-2 text-sm text-gray-700">Interpreter Required</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disability (if known)</label>
                  <textarea
                    name="disability"
                    value={formData.disability}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    rows={4}
                    disabled={status.submitting}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    rows={4}
                    disabled={status.submitting}
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Primary Carer Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Primary Carer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="carerFirstName"
                    value={formData.carerFirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="carerLastName"
                    value={formData.carerLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Address</label>
                  <input
                    type="text"
                    name="carerPostalAddress"
                    value={formData.carerPostalAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="carerEmail"
                    value={formData.carerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="carerPhone"
                    value={formData.carerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="carerMobile"
                    value={formData.carerMobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    disabled={status.submitting}
                  />
                </div>
              </div>
            </section>

            {/* Referrer Details */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-teal-700">Referrer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="referrerFirstName"
                    value={formData.referrerFirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="referrerLastName"
                    value={formData.referrerLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                  <input
                    type="text"
                    name="referrerOrganization"
                    value={formData.referrerOrganization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    name="referrerPosition"
                    value={formData.referrerPosition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="referrerContact"
                    value={formData.referrerContact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Address</label>
                  <input
                    type="text"
                    name="referrerPostalAddress"
                    value={formData.referrerPostalAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="referrerEmail"
                    value={formData.referrerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                    required
                    disabled={status.submitting}
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status.submitting}
              >
                {status.submitting ? 'Submitting...' : 'Submit Referral'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Referral;