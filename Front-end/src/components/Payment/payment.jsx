import Hero from './visa.png'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
export default function payment() {

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        cvc: '',
        expiryDate: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };


    const validateForm = () => {
        const errors = {};

        // Perform validation checks
        if (!formData.cardNumber) {
            errors.cardNumber = 'رقم البطاقة مطلوب';
        } else if (!/^\d{13,16}$/.test(formData.cardNumber)) {
            errors.cardNumber = 'رقم البطاقة غير صحيح';
        }

        if (!formData.cvc) {
            errors.cvc = 'رمز CVC مطلوب';
        } else if (!/^\d{3,4}$/.test(formData.cvc)) {
            errors.cvc = 'رمز CVC غير صحيح';
        }

        if (!formData.cardHolder) {
            errors.cardHolder = 'اسم حامل البطاقة مطلوب';
        } else if (!/.+/.test(formData.cardHolder)) {
            errors.cardHolder = 'اسم حامل البطاقة غير صحيح';
        }

        if (!formData.expiryDate) {
            errors.expiryDate = 'تاريخ الانتهاء مطلوب';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
            errors.expiryDate = 'تاريخ الانتهاء غير صحيح';
        }


        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                // Send the form data to the server
                const userData = {

                    cardNumber: formData.cardNumber,
                    cardHolder: formData.cardHolder,
                    cvc: formData.cvc,
                    expiryDate: formData.expiryDate,
                };
                const response = await axios.post(
                    'http://localhost:5501/api/Payment',
                    userData
                );
                console.log(response.data)
                setErrors('');
                setFormData({

                    cardNumber: '',
                    cardHolder: '',
                    cvc: '',
                    expiryDate: '',
                });
            } catch (error) {
                console.log('Error:', error.message);
            }
        } else {
            setErrors(errors);
        }
    };
    return (
        <>
            <div className="w-full flex items-center justify-center flex-row h-screen gap-20">

                <div className="grid sm:px-10 lg:grid-cols-2  justify-center">
                    <img
                        className="-z-1 left-0  absolute top-0 h-screen w-[50vw] object-cover opacity-90"
                        src={Hero}
                        alt="Background"
                    />
                    <div></div>
                    <form className="mt-10  px-4 pt-8 lg:mt-0 ml-20" onSubmit={handleSubmit}>
                        <p className="text-xl font-medium text-right">تفاصيل الدفع </p>
                        <p className="text-green-400 text-right">تبرع الان ولنجعل العالم افضل معا</p>
                        <div className="" >
                            <label className="mt-4 mb-2 block text-sm font-medium text-right">اسم صاحب البطاقه</label>
                            <div className="relative">
                                <input type="text" id="card-holder" value={formData.cardHolder}
                                    onChange={handleChange} name="cardHolder" className="w-full  border-b-2  text-right border-green-400 px-4 py-3 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-b-blue-500 focus:ring-blue-500" placeholder="ادخل اسمك الكامل " />
                                <div className="pointer-events-none absolute inset-y-0 right-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className='w-full flex items-end mt-3  mr-2 justify-end'>{errors.cardHolder && <span className='text-red-600'>{errors.cardHolder}</span>}</div>

                            <label className=" text-right mt-4 mb-2 block text-sm font-medium">تفاصيل البطاقه</label>
                            <div className="flex">


                                <div className='flex flex-col mr-3   w-full'>
                                    <input type="text" value={formData.expiryDate}
                                        onChange={handleChange} name="expiryDate" className="w-full mr-4 ml-4 flex-shrink-0  border-b-2  border-green-400 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-b-blue-500 focus:ring-blue-500" placeholder="mm/yy" />

                                    <div className='w-full flex items-end  mr-2 justify-end'>{errors.expiryDate && <span className='text-red-600'>{errors.expiryDate}</span>}</div>
                                </div>
                                <br />
                                <div className='flex flex-col mr-6  w-full'>
                                    <input type="text" value={formData.cvc}
                                        onChange={handleChange} name="cvc" className="w-full mr-4 ml-4 flex-shrink-0  border-b-2  border-green-400 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-b-blue-500 focus:ring-blue-500" placeholder="CVC" />

                                    <div className='w-full flex items-end  mr-2 justify-end'>{errors.cvc && <span className='text-red-600'>{errors.cvc}</span>}</div>

                                </div>
                                <div className="relative w-7/12 flex-shrink-0">
                                    <div className="pointer-events-none absolute inset-y-0  right-0 inline-flex items-center px-3">
                                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                        </svg>
                                    </div>
                                    <input value={formData.cardNumber}
                                        onChange={handleChange} type="text" id="card-no" name="cardNumber" className="w-full text-right  border-b-2  border-green-400 px-4 py-3 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-b-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                                    <div className='w-full flex items-end  mr-2 justify-end'>{errors.cardNumber && <span className='text-red-600'>{errors.cardNumber}</span>}</div>

                                </div>
                            </div>



                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-2xl font-semibold text-green-600 ">$408.00</p>
                                <p className="text-sm font-medium text-gray-900">مبلغ التبرع</p>
                            </div>
                        </div>

                        <button type="submit" className="mt-10 box-border relative z-30 inline-flex items-center justify-center w-full px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-green-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-green-300 ring-offset-indigo-200 hover:ring-offset-green-500 ease focus:outline-none">
                            <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                            <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                            <span className="relative z-20 flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="relative  w-5 h-5 mr-2 text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="232" x2="128" y2="88" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="128" y1="152" x2="80" y2="128" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="128" y1="128" x2="176" y2="104" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><path d="M132.5,181.2A64,64,0,1,0,194.7,69.9a8.6,8.6,0,0,1-4-4.2,68,68,0,0,0-125.4,0,8.6,8.6,0,0,1-4,4.2,64,64,0,1,0,62.2,111.3A8.2,8.2,0,0,1,132.5,181.2Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /></svg>

                                تبرع الان
                            </span>
                        </button>
                    </form>
                </div >

            </div>
        </>
    )
}
