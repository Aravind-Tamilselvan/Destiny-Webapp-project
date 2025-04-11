import { useEffect, useState } from 'react';
import '../page.css'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination } from 'swiper/modules';
import Card from '../../components/Card';
import { Box, Tabs, Tab } from '@mui/material';
import useFamily from '../../hooks/packages/useFamily';

const FamilyPage = () => {
    const { family, isLoading } = useFamily()
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
    }, []);

    const [index, setIndex] = useState(0);
    const handleChange = (event, newValue) => setIndex(newValue);

    const generalPackage = family?.filter((pkg) => pkg.packageType === "family" && pkg.customizablePackage === false)
    const customizePackage = family?.filter((pkg) => pkg.packageType === "family" && pkg.customizablePackage === true)

    const CustomTabPanel = ({ value, index, children }) => (
        <div hidden={value !== index}>
            {value === index && <>{children}</>}
        </div>
    );
    return (
        <div className='Adventure'>
            {/* Main slider */}
            <div className='slider-section'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                     {family?.map((pkg) => (
                        <SwiperSlide className='slide-image' key={pkg._id}>
                            {/* <h1>{pkg.name}</h1> */}
                            <img src={pkg.image[0]} alt={pkg.name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='packages'>
                <div className="heading">
                    <h1>Family Packages</h1>
                </div>
                {!isLoading ? (<Box width={"100%"}>
                    <Tabs value={index} onChange={handleChange} className='tabs'>
                        <Tab label='General Packages' />
                        <Tab label='Customizable Packages' />
                    </Tabs>
                    <CustomTabPanel value={index} index={0} className='tab-panel'>
                        <div className='package-card'>
                            {generalPackage.map((pkg) => (
                                <Card
                                    key={pkg._id}
                                    id={pkg._id}
                                    name={pkg.name}
                                    image={pkg.image}
                                    totalSlots={pkg.availability.totalSlots}
                                    totalDays={pkg.packageDetails.totalDays}
                                    totalCost={pkg.packageDetails.totalCost}
                                    language={pkg.language}
                                    location={pkg.location}
                                />
                            ))}
                        </div>
                    </CustomTabPanel>

                    <CustomTabPanel value={index} index={1} className='tab-panel'>
                        <div className='package-card'>
                            {customizePackage.map((pkg) => (
                                <Card
                                    key={pkg._id}
                                    id={pkg._id}
                                    name={pkg.name}
                                    image={pkg.image}
                                    totalSlots={pkg.availability.totalSlots}
                                    totalDays={pkg.packageDetails.totalDays}
                                    totalCost={pkg.packageDetails.totalCost}
                                    language={pkg.language}
                                    location={pkg.location}
                                />
                            ))}
                        </div>
                    </CustomTabPanel>
                </Box>) : (
                    <p style={{ textAlign: "center" }}>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default FamilyPage