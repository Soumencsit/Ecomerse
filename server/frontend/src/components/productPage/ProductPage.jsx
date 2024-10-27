

import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import './ProductPage.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Storecontext } from '../../context/StoreContext';

const ProductPage = () => {
    const [categories, setCategories] = useState([]);
    const [interestedCategories, setInterestedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageRange, setPageRange] = useState([1, 5]); // Visible page range [start, end]
    
    const{userLogin,setUserLogin,userId,setId}=useContext(Storecontext)
    const _id = userId;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/product/list?page=${currentPage}&limit=6`);
                setCategories(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [currentPage]);

    const handleSelectCategory = (categoryId) => {
        setInterestedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const saveInterests = async () => {
        try {
            await axios.post(`${window.location.origin}/api/user/saveInterest`, {
                _id,
                selectedCategories: interestedCategories,
            });
            toast.success('Your interests have been saved!')
            
        } catch (error) {
            console.error('Error saving interests:', error);
        }
    };

    // Generate page numbers for the current range
    const getPageNumbers = () => {
        const [start, end] = pageRange;
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleNextRange = () => {
        if (pageRange[1] < totalPages) {
            setPageRange([pageRange[0] + 1, pageRange[1] + 1]);
            goToPage(currentPage + 1);
        }
    };

    const handlePrevRange = () => {
        if (pageRange[0] > 1) {
            setPageRange([pageRange[0] - 1, pageRange[1] - 1]);
            goToPage(currentPage - 1);
        }
    };

    return (
        <div className="interests-container">
            <ToastContainer/>
            <h1>Select Your Interests</h1>
            <ul className="interests-list">
                {categories.map((category) => (
                    <li key={category._id} className="interest-item">
                        <input
                            type="checkbox"
                            checked={interestedCategories.includes(category._id)}
                            onChange={() => handleSelectCategory(category._id)}
                        />
                        <label>{category.name}</label>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination">

                <button onClick={handlePrevRange} disabled={pageRange[0] === 1}>&lt;</button>
                
                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        onClick={() => goToPage(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}

                <button onClick={handleNextRange} disabled={pageRange[1] >= totalPages}>&gt;</button>
                
            </div>

            <div className='interest'>

             <button onClick={saveInterests}>Save Interests</button>
            </div>
        </div>
    );
};

export default ProductPage;
