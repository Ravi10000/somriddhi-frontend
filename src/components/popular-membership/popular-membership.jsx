import MembershipOfferCard from './membership-offer-card/membership-offer-card';
import './popular-membership.styles.scss';
import popularOfferList from './popular-offers-list';
import { getAllMemberships } from '../../api/index';
import { useEffect, useState } from 'react';

export default function PopularMembership() {
    const [memberships, setMemberships] = useState([]);

    const allMembershipsData = async () => {
        const allmemberships = await getAllMemberships();
        // console.log(allmemberships);
        setMemberships(allmemberships.data.data);
    }

    useEffect(() => {
        allMembershipsData();
    }, []);
    return (
        <section className='popular-membership-section'>
            <h2 className='_title'>Popular Membership</h2>
            <div className="offers-container">
                {
                    memberships.map((membership, index) => (
                        <img className='offer' src={`http://localhost:8001/uploads/${membership.image}`} alt="offer" />
                    ))
                }
                {/* <div className="offer">
                    <img className='offer-bg' src="/offer4.png" alt="offer" />
                    <div className="offer-cards-container">
                        {
                            popularOfferList.map(({ title, imgUrl, details }, index) => <MembershipOfferCard key={index} title={title} imgUrl={imgUrl} details={details} />)
                        }
                    </div>
                </div> */}
            </div>
        </section>
    )
}
