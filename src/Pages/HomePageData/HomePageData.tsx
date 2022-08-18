import BottomSliderdata from "../../Components/HomePage/BottomSliderdata";
import CoreServices from "../../Components/HomePage/CoreServices";
import TopBanner from "../../Components/HomePage/TopBanner";
import TopSliderData from "../../Components/HomePage/TopSliderData";
import TrendingSlider from "../../Components/HomePage/TrendingSlider";

const HomePageData = () => {

    return (
        <>

            <TopBanner />
            <TrendingSlider />
            <TopSliderData />
            <CoreServices />
            <BottomSliderdata />
        </>
    );
};

export default HomePageData;
