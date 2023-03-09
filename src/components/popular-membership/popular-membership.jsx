import MembershipOfferCard from './membership-offer-card/membership-offer-card';
import './popular-membership.styles.scss';
import popularOfferList from './popular-offers-list';

export default function PopularMembership() {
    return (
        <section className='popular-membership-section'>
            <h2 className='_title'>Popular Membership</h2>
            <div className="offers-container">
                <img className='offer' src="/offer1.png" alt="offer" />
                {/* <div className="offer">
                    <img className='offer-bg' src="/offer4.png" alt="offer" />
                    <div className="offer-cards-container">
                        {
                            popularOfferList.map(({ title, imgUrl, details }, index) => <MembershipOfferCard key={index} title={title} imgUrl={imgUrl} details={details} />)
                        }
                    </div>
                </div> */}
                <img className='offer' src="/offer4.png" alt="offer" />
                <img className='offer' src="/offer2.png" alt="offer" />
                <img className='offer' src="/offer3.png" alt="offer" />
            </div>
        </section>
    )
}
