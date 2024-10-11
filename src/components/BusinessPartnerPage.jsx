import React, { useState, useEffect } from 'react';
import '../styling/BusinessPartnerPage.css';

const menuItems = [
  'Paanipuri - 25/-', 'Masala Poori - 25/-', 'Chat Masala - 30/-', 'Aalo Chat/Cutlet - 30/-', 'Gobi Manchurian (mini) - 25/-',
  'Gobi Manchurian (full) - 50/-', 'Dry Gobi (mini) - 25/-', 'Dry Gobi (full) - 50/-', 'Fried Rice - 50/-', 'Gobi Fried Rice - 60/-',
  'Egg Fried Rice -60/-', 'Double Egg Fried Rice - 70/-', 'Egg Gobi Rice - 70/-', 'Chicken Fried Rice - 90/-', 'Noodles - 60/-',
  'Egg Noodles - 70/-', 'Chicken Noodles - 90/-', 'Bhel Poori - 30/-', 'Dahi Poori - 30/-'
];

// Character component
const Character = ({ storeStatus, isUpdating }) => {
  return (
    <div className={`character-container ${storeStatus} ${isUpdating ? 'updating' : ''}`}>
      <div className="character">
        <div className="head">
          <div className="eyes"></div>
          <div className="mouth"></div>
        </div>
      </div>
    </div>
  );
};

const BusinessPartnerPage = () => {
  const [storeStatus, setStoreStatus] = useState('closed');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);


  // Load storeStatus from localStorage on page load
  useEffect(() => {
    const savedStatus = localStorage.getItem('storeStatus');
    if (savedStatus) {
      setStoreStatus(savedStatus); // Persist the store status
    }
  }, []);

  // Load selected menu items from localStorage if store is open
  useEffect(() => {
    if (storeStatus === 'open') {
      const savedMenu = JSON.parse(localStorage.getItem('kdChatsMenu')) || [];
      setSelectedItems(savedMenu);
    }
  }, [storeStatus]);

  // Update storeStatus in localStorage whenever it changes manually
  const handleStoreStatusChange = (status) => {
    setStoreStatus(status);
    localStorage.setItem('storeStatus', status); // Persist store status
    if (status === 'closed') {
      setSelectedItems([]); // Clear selected items if store is closed
      localStorage.setItem('kdChatsMenu', JSON.stringify([])); // Clear localStorage as well
    }
  };

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('kdChatsMenu', JSON.stringify(selectedItems));
    alert('Items updated successfully!');
    setIsCustomModalOpen(false); // Close modal after submission
    setIsUpdating(false); // Stop updating status
  };

  const handleUpdateClick = () => {
    setIsUpdating(true); // Set updating status
    setIsCustomModalOpen(true); // Open custom modal
  };

  return (
    <div className="business-partner-page">
      <h2>List of items available right now at your store</h2>

      {/* Store status toggles */}
      <div className="store-toggle">
        <label>
          <input
            type="radio"
            value="open"
            checked={storeStatus === 'open'}
            onChange={() => handleStoreStatusChange('open')}
          />
          Store is Open
        </label>
        <label>
          <input
            type="radio"
            value="closed"
            checked={storeStatus === 'closed'}
            onChange={() => handleStoreStatusChange('closed')}
          />
          Store is Closed
        </label>
      </div>

      {/* Character Animation */}
      <Character storeStatus={storeStatus} isUpdating={isUpdating} />

      {/* Display items when store is open */}
      {storeStatus === 'open' && (
        <div>
          <button onClick={handleUpdateClick} className="glow-btn">
            Update Items for This Moment
          </button>

          {/* Custom Modal for updating menu items */}
          {isCustomModalOpen && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <button className="close-custom-modal" onClick={() => setIsCustomModalOpen(false)}>X</button>
                <h3 className="custom-modal-title">Update Menu Items</h3>

                <form className="custom-modal-form">
                  {/* Two-column layout for menu items */}
                  <div>
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={selectAll}
                      onChange={(e) => {
                        setSelectAll(e.target.checked);
                        if (e.target.checked) {
                          setSelectedItems(menuItems);
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                    <label htmlFor="selectAll">Select All</label>
                  </div>

                  <div className="menu-items-grid">
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={item}
                          value={item}
                          checked={selectedItems.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    ))}
                  </div>
                </form>

                <button onClick={handleSubmit} className="submit-btn">
                  {selectedItems.length > 0 ? 'Update Items' : 'Submit'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessPartnerPage;
