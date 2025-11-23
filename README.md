
Hotel Booking Application

This project is an Angular application for a Hotel Booking interface, generated with **Angular CLI** version 18.2.6.

## How to Run the Application

Follow these steps to set up and run the Angular application locally.

### Prerequisites

You need the following installed on your system:

* **Node.js** (LTS version recommended)
* **npm** or **Yarn** package manager
* **Angular CLI** (Globally installed, recommended version 18.2.6 or later)
    ```bash
    npm install -g @angular/cli
    ```

### Step 1: Clone and Install Dependencies

1.  Clone the Repository :
    ```bash
    git clone [YOUR-REPOSITORY-URL]
    cd [YOUR-PROJECT-NAME]
    ```

2.  Install Project Dependencies:
    Run the install command inside the project directory:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Step 2: Run the Development Server

Use the Angular CLI command to start the development server:

```bash
ng serve


Here’s a explanation of design decisions behind the interface.

1. Visual Hierarchy

* The title “Available Rooms” is placed prominently at the top with large typography to clearly indicate the page purpose.
* Room cards use bold room numbers and clean spacing to ensure users can quickly scan available options.

2. Clear Call-to-Action

* The “Book Now” button is clearly styled and positioned at the bottom of each card to encourage action.
* Button color contrasts well with the card background, ensuring visibility and accessibility.

3. Simple, Focused Filters

* Filters appear on the right as a clean, minimal panel, following the principle of progressive disclosure.
* Users only see extra filtering options when they choose to open the filter menu, keeping the page uncluttered.

10. Aesthetic Minimalism

* A calm, earthy color palette aligns with a hotel/retreat brand identity, creating a relaxing feel.
* Minimal design helps focus attention on the rooms, which are the primary content.
