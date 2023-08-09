import React, { useState } from 'react';
import './stypeHistoryDis.css';
import { Link, Route, Routes } from 'react-router-dom';
interface Book {
    bookingDate: string;
    bookingStatus: string;
    bookingTitle: string;
    customer: string;
    descriptions: string;
    endDateTime: string;
    id: null;
    note: string;
    priceDetails: string;
    salesEmployee: string;
    servicePackage: string;
    startDateTime: string;
    totalPrice: number;
    vouchers: []
}
interface Props {
    b: [];
}
const HistoryDisplay: React.FC<Props> = (props) => {
    const { b } = props;
    return (

        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    {b.map((booking: Book) => {
                        return (
                            <div key={booking.id} className="row p-2 bg-white border rounded">
                                <div className="col-md-3 mt-1">
                                    <img className="img-fluid img-responsive rounded product-image" src="https://static.vecteezy.com/system/resources/previews/002/962/894/original/travelling-vacation-design-illustration-with-cartoon-style-free-vector.jpg" />
                                </div>
                                <div className="col-md-6 mt-1">
                                    <h5>{booking.bookingTitle}</h5>

                                    <p >
                                        {booking.note}
                                        <br /><br />
                                    </p>
                                </div>
                                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                                    <div className="d-flex flex-row align-items-center">
                                        <h4 className="mr-1">{booking.totalPrice.toLocaleString()} đ</h4>
                                        <span className="strike-text"></span>
                                    </div>

                                </div>
                            </div>
                        );
                    })

                    }

                </div>
            </div>
        </div>

    )
}

export default HistoryDisplay