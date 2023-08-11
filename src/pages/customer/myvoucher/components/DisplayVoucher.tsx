import React from 'react'
import './stypeDisplayVoucer.css';
interface Props {
    voucher: []
}
interface voucher {
    actualPrice: number
    bookings: []
    customer: string
    expiredDate: string
    id: number
    issuedDate: string
    salesEmployee: string
    usedValueDiscount: string
    voucherExtensions: []
    voucherStatus: string
    voucherType: string
}
const DisplayVoucher: React.FC<Props> = (props) => {
    const { voucher } = props;
    return (


        <div className="bossWrapp">
            {
                voucher.map((v: voucher) => {
                    return (
                        <div key={v.id} className="single noBd" >
                            <div className="icon">
                                <img className="image" src="https://ben.com.vn/tin-tuc/wp-content/uploads/2021/04/voucher-la-gi.jpg " alt="" />
                            </div>
                            <div className="text">
                                <div className="header-voucher">
                                    <h3>{v.actualPrice.toLocaleString()} đ Voucher</h3>
                                    <div className="desc">
                                        <h5>Your Plan includes $100 credit in Bing Ads. Connect with valuable customers searching for your business.</h5>
                                    </div>
                                </div>
                                <div className="functions">
                                    <span >{v.expiredDate}</span>
                                    <span>Claim Voucher
                                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10">
                                            <polyline fill="none" stroke="#3899EC" points="105.077 13.154 101 9.077 105.077 5" transform="rotate(-180 53.038 7.077)" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DisplayVoucher
