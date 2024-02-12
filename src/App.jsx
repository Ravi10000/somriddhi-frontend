import styles from "./App.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react hooks
import { useEffect, lazy, Suspense } from "react";
import { useLoginModal } from "./context/login-modal-context";

// packages
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import ScrollToTop from "./components/scrollToTop";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import LoginPopup from "./components/login-popup/login-popup";
import Flash from "./components/flash/flash";
import ProtectedRoute from "./components/protected-route/protected-route";

// redux actions
import { setCurrentUser, setIsFetching } from "./redux/user/user.actions";

// redux selectors
import { selectFlash } from "./redux/flash/flash.selectors";

// api calls
import { getUser } from "./api";
import ProtectAdminRoute from "./pages/protect-admin-route/protect-admin-route";
import LoadingPage from "./pages/loading/loading";
import AdminLoginPage from "./pages/admin/login/login";
import ResetPasswordPage from "./pages/reset-password/reset-password";
import VoucherDetails from "./components/voucher-details.jsx/voucher-details";
const GiftCardPage = lazy(() =>
  import("./pages/gift-card-page/gift-card-page")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout"));
const TermsPage = lazy(() => import("./pages/terms/terms"));
const RefundPolicyPage = lazy(() => import("./pages/refund/refund"));
const PrivacyPolicyPage = lazy(() =>
  import("./pages/privacy-policy/privacy-policy")
);
const TermsOfUsePage = lazy(() => import("./pages/terms-of-use/terms-of-use"));
const HomePage = lazy(() => import("./pages/home/home.page"));
const CouponPage = lazy(() => import("./pages/coupon/coupon-page"));
const CategoryPage = lazy(() => import("./pages/category/category-page"));
const CouponsClaimedPage = lazy(() =>
  import("./pages/coupon-claimed/coupon-claimed-page")
);
const ProfilePage = lazy(() => import("./pages/profile/profile-page"));
const AdminPage = lazy(() => import("./pages/admin/admin.page"));
const SearchPage = lazy(() => import("./pages/search-page/search-page"));
const AboutPage = lazy(() => import("./pages/about/about.page"));
const PaymentStatusPage = lazy(() =>
  import("./pages/payment-status/payment-status")
);

function App({ setCurrentUser, setIsFetching, flash }) {
  const modal = useLoginModal();
  const { pathname } = useLocation();
  async function fetchUser() {
    try {
      setIsFetching(true);
      const response = await getUser();
      console.log({ user: response });
      if (response.data.status === "success") {
        await setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles["App"]} id="App">
      {flash && <Flash type={flash.type} message={flash.message} />}
      <ScrollToTop />
      {modal.modalOpen && <LoginPopup closeModal={modal.closeModal} />}
      {!pathname.includes("/admin") &&
        !pathname.includes("/reset-password") && (
          <>
            <Header openModal={modal.openModal} />
            <Navbar />
          </>
        )}
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route
            path="/admin"
            element={
              // <ProtectAdminRoute>
              <Navigate to="/admin/banners" replace />
              // </ProtectAdminRoute>
            }
          />
      <Route
            path="/:voucher"
            element={
                <VoucherDetails />
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/:tab"
            element={
              <ProtectAdminRoute>
                <AdminPage />
              </ProtectAdminRoute>
            }
          />
          {/* <Route path="/admin/:tab" element={<AdminPage />} /> */}
          <Route path="/coupon/:id" element={<CouponPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route
            exact
            path="/coupon-claimed/:id"
            element={<CouponsClaimedPage />}
          />
          <Route
            exact
            path="/profile"
            element={<Navigate to="/profile/my-earnings" replace />}
          />
          <Route
            exact
            path="/profile/:tab"
            element={
              <ProtectedRoute openModal={modal.openModal}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute openModal={modal.openModal}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/terms-and-conditions" exact element={<TermsPage />} />
          <Route path="/terms-of-use" exact element={<TermsOfUsePage />} />
          <Route path="/refund-policy" exact element={<RefundPolicyPage />} />
          <Route path="/privacy-policy" exact element={<PrivacyPolicyPage />} />

          <Route
            path="/giftcard/:price"
            element={
              <ProtectedRoute openModal={modal.open}>
                <GiftCardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute openModal={modal.open}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/payment-status/:id" element={<PaymentStatusPage />} />
          <Route
            path="/reset-password/:requestId"
            element={<ResetPasswordPage />}
          />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {!pathname.includes("/admin") &&
        !pathname.includes("/reset-password") && <Footer />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  flash: selectFlash,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
