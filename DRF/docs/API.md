# DRF Platform API Documentation

## Auth
- `POST /auth/login` – Wallet signature login
- `POST /auth/logout` – Logout
- `POST /auth/refresh` – Refresh JWT

## Users
- `GET /users/me` – Get current user
- `POST /users/register` – Register user
- `PUT /users/me` – Update profile

## Proposals
- `GET /proposals` – List proposals
- `GET /proposals/:id` – Proposal detail
- `POST /proposals` – Submit proposal
- `POST /proposals/:id/milestones` – Submit milestone proof

## KYC
- `POST /kyc/initiate` – Start KYC
- `GET /kyc/status` – Get KYC status
- `POST /kyc/webhook` – KYC provider webhook
- `POST /kyc/approve` – Admin approve
- `POST /kyc/reject` – Admin reject

### See OpenAPI/Swagger for full request/response schemas.
