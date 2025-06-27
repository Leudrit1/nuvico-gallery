# NUVICO Art Gallery - Replit.md

## Overview

NUVICO is a premium art gallery and marketplace web application built with modern full-stack technologies. The platform connects art enthusiasts with talented artists worldwide, enabling users to discover, browse, and purchase carefully curated paintings and artworks.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with JSON responses

### Database Schema
The application uses a PostgreSQL database with the following key tables:
- `sessions`: Session storage for authentication
- `users`: User profiles with artist capabilities
- `artworks`: Artwork listings with metadata and pricing

## Key Components

### Authentication System
- **Provider**: Replit Auth integration with OIDC
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user creation/update on login
- **Authorization**: Role-based access (regular users vs artists)

### Art Management
- **Artwork Catalog**: Full CRUD operations for artworks
- **Image Handling**: URL-based image storage
- **Search & Filtering**: Style, price range, and artist-based filtering
- **Artist Profiles**: Dedicated artist pages with portfolio display

### UI/UX Design
- **Design System**: Custom warm, earthy color palette (beige, brown, charcoal)
- **Component Library**: Comprehensive shadcn/ui integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Radix UI primitives ensure WCAG compliance

## Data Flow

1. **User Authentication**: 
   - Users authenticate via Replit Auth
   - Sessions stored in PostgreSQL
   - User profiles automatically created/updated

2. **Artwork Display**:
   - Public gallery browsing without authentication
   - Server-side filtering and sorting
   - Client-side state management with React Query

3. **Artist Dashboard**:
   - Authenticated artists can manage their artworks
   - CRUD operations with optimistic updates
   - Image upload via URL input

4. **Data Persistence**:
   - All data stored in PostgreSQL via Drizzle ORM
   - Database migrations managed through Drizzle Kit
   - Environment-based configuration

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless
- **Authentication**: Replit Auth service
- **Frontend Build**: Vite with React plugin
- **Styling**: Tailwind CSS with PostCSS

### Key Libraries
- **ORM**: Drizzle ORM with Neon serverless adapter
- **Validation**: Zod schema validation
- **UI Components**: Radix UI primitives
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 module
- **Development Server**: Concurrent frontend (Vite) and backend (Express)
- **Hot Reload**: Vite HMR for frontend, tsx for backend TypeScript execution
- **Port Configuration**: Backend on 5000, proxied to port 80

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment**: Replit autoscale deployment target
- **Environment**: Production mode with optimized builds

### Database Configuration
- **Development**: Direct connection to Neon PostgreSQL
- **Schema Management**: Drizzle migrations in `migrations/` directory
- **Connection**: Environment variable `DATABASE_URL` required

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```