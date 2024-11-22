import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false });

    try {
      await emailjs.send(
        'service_2jmrt88', // Replace with your EmailJS service ID
        'contact_us', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Live Well Care',
          to_email: 'admin@livewellsupport.com.au'
        },
        'kTYrUHOc2sp_VvK8Q' // Replace with your EmailJS public key
      );

      setStatus({ submitting: false, submitted: true, error: false });
      setFormData({ name: '', email: '', message: '' });

      // Show success message
      alert('Message sent successfully!');
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: true });
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <Phone className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600">0408116985</p>
                </div>
              </div>
              <div className="flex items-center mb-8">
                <Mail className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600">admin@livewellsupport.com.au</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-gray-600">Follington Street zuccoli, NT, 0832</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  required
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your email"
                  required
                  disabled={status.submitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Your message"
                  required
                  disabled={status.submitting}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
              {status.error && (
                <p className="text-red-500 text-sm mt-2">
                  Failed to send message. Please try again.
                </p>
              )}
              {status.submitted && (
                <p className="text-green-500 text-sm mt-2">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};