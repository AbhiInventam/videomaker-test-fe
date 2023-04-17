import {
  AboutRoute,
  CartRoute,
  ContactUsRoute,
  CookiePolicyRoute,
  EditProfileRoute,
  ForgotPassRoute,
  HomeRoute,
  LoginRoute,
  PaymentRoute,
  PrivacyPolicyRoute,
  RegisterRoute,
  ResetPassRoute,
  VerificationRoute,
  OTPRoute,
  FeaturesRoute,
  PricingRoute,
  TermsServicesRoute
  // DashboardRoute
} from 'src/utils/constants/routeConstant'

export const publicRoutes = [
  // DashboardRoute, // This route is just for temp purpose later only accessible by login user
  HomeRoute,
  LoginRoute,
  RegisterRoute,
  OTPRoute,
  AboutRoute,
  ContactUsRoute,
  PrivacyPolicyRoute,
  TermsServicesRoute,
  CookiePolicyRoute,
  ForgotPassRoute,
  ResetPassRoute,
  EditProfileRoute,
  VerificationRoute,
  // CartRoute,
  // PaymentRoute,
  FeaturesRoute,
  PricingRoute
  // API routes
]
