/* ==========================================================================
   RIGITAL ECOSYSTEM — MOCK DATA
   In a real build this would come from the API layer (React Query / TanStack).
   ========================================================================== */

const RigitalData = {

  kpis: [
    { label: "Active Businesses", value: "1,284", delta: "+8.2%", trend: "up", icon: "building-2", color: "blue" },
    { label: "Monthly Revenue", value: "₹42.6L", delta: "+12.4%", trend: "up", icon: "indian-rupee", color: "success" },
    { label: "New Leads", value: "356", delta: "+4.1%", trend: "up", icon: "users", color: "violet" },
    { label: "Churn Rate", value: "1.8%", delta: "-0.3%", trend: "down", icon: "trending-down", color: "warning" }
  ],

  revenueSeries: {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [18.2, 21.4, 26.8, 31.2, 37.9, 42.6]
  },

  leadSources: {
    labels: ["Organic Search", "Referral", "Bio Link", "Paid Ads", "Direct"],
    data: [34, 22, 18, 16, 10]
  },

  activity: [
    { icon: "user-plus", title: "New business onboarded", sub: "Sharma & Sons Traders", time: "12m ago" },
    { icon: "file-check-2", title: "Contract e-signed", sub: "Kalpataru Constructions", time: "48m ago" },
    { icon: "calendar-check", title: "Appointment confirmed", sub: "with Meera Iyer, 4:30 PM", time: "1h ago" },
    { icon: "credit-card", title: "Invoice paid", sub: "₹68,000 — Nova Interiors", time: "2h ago" },
    { icon: "message-square", title: "New enquiry via Bio Link", sub: "Ananya Retail Co.", time: "3h ago" }
  ],

  tasks: [
    { title: "Review Q3 compliance filing", due: "Today", done: false },
    { title: "Call back — Vertex Logistics lead", due: "Today", done: false },
    { title: "Approve Meera's marketing creatives", due: "Tomorrow", done: false },
    { title: "Send proposal to Orbit Retail", due: "Jul 31", done: true },
    { title: "Update vCard for new hires", due: "Aug 2", done: false }
  ],

  leads: [
    { name: "Ananya Retail Co.", stage: "New", value: "₹1,20,000", owner: "RK" },
    { name: "Vertex Logistics", stage: "Contacted", value: "₹3,40,000", owner: "SP" },
    { name: "Orbit Retail Pvt Ltd", stage: "Proposal", value: "₹85,000", owner: "MI" },
    { name: "Kalpataru Constructions", stage: "Won", value: "₹6,10,000", owner: "RK" }
  ],

  businesses: [
    { id: 1, name: "Sharma & Sons Traders", category: "Retail", owner: "Ravi Sharma", location: "Hyderabad, TG", status: "Active", plan: "Scale", revenue: "₹4,82,000", updated: "2 days ago" },
    { id: 2, name: "Kalpataru Constructions", category: "Construction", owner: "Meena Kalpataru", location: "Pune, MH", status: "Active", plan: "Enterprise", revenue: "₹12,40,000", updated: "5 hours ago" },
    { id: 3, name: "Nova Interiors", category: "Design", owner: "Aarav Nair", location: "Bengaluru, KA", status: "Active", plan: "Starter", revenue: "₹1,10,000", updated: "1 day ago" },
    { id: 4, name: "Ananya Retail Co.", category: "Retail", owner: "Ananya Rao", location: "Chennai, TN", status: "Trial", plan: "Free", revenue: "₹0", updated: "3 days ago" },
    { id: 5, name: "Vertex Logistics", category: "Logistics", owner: "Suresh Pillai", location: "Mumbai, MH", status: "Active", plan: "Scale", revenue: "₹6,75,000", updated: "6 hours ago" },
    { id: 6, name: "Orbit Retail Pvt Ltd", category: "Retail", owner: "Divya Menon", location: "Kochi, KL", status: "Inactive", plan: "Starter", revenue: "₹42,000", updated: "2 weeks ago" },
    { id: 7, name: "Bluepeak Consulting", category: "Consulting", owner: "Karan Mehta", location: "Delhi, DL", status: "Active", plan: "Enterprise", revenue: "₹18,90,000", updated: "1 hour ago" },
    { id: 8, name: "Greenline Foods", category: "F&B", owner: "Priya Iyer", location: "Hyderabad, TG", status: "Active", plan: "Scale", revenue: "₹5,20,000", updated: "4 days ago" },
    { id: 9, name: "Wavecrest Media", category: "Media", owner: "Farhan Ali", location: "Mumbai, MH", status: "Trial", plan: "Free", revenue: "₹0", updated: "1 day ago" },
    { id: 10, name: "Silverline Textiles", category: "Manufacturing", owner: "Neha Kapoor", location: "Surat, GJ", status: "Active", plan: "Starter", revenue: "₹95,000", updated: "3 hours ago" },
    { id: 11, name: "Urban Nest Realty", category: "Real Estate", owner: "Vikram Rathod", location: "Ahmedabad, GJ", status: "Active", plan: "Scale", revenue: "₹9,30,000", updated: "2 days ago" },
    { id: 12, name: "Crestwood Legal", category: "Legal", owner: "Ishita Sen", location: "Kolkata, WB", status: "Inactive", plan: "Starter", revenue: "₹28,000", updated: "3 weeks ago" }
  ],

  contacts: [
    { name: "Ravi Sharma", company: "Sharma & Sons Traders", email: "ravi@sharmasons.in", phone: "+91 98765 43210", tag: "Client" },
    { name: "Meena Kalpataru", company: "Kalpataru Constructions", email: "meena@kalpataru.in", phone: "+91 91234 56780", tag: "Client" },
    { name: "Ananya Rao", company: "Ananya Retail Co.", email: "ananya@retailco.in", phone: "+91 90000 11223", tag: "Lead" },
    { name: "Suresh Pillai", company: "Vertex Logistics", email: "suresh@vertexlog.in", phone: "+91 98080 22334", tag: "Lead" },
    { name: "Karan Mehta", company: "Bluepeak Consulting", email: "karan@bluepeak.in", phone: "+91 99887 76655", tag: "Partner" }
  ],

  appointments: [
    { title: "Onboarding call", who: "Ananya Rao", time: "10:00 AM", type: "Video" },
    { title: "Contract review", who: "Meena Kalpataru", time: "12:30 PM", type: "In-person" },
    { title: "Renewal discussion", who: "Karan Mehta", time: "3:00 PM", type: "Video" },
    { title: "Site visit", who: "Vikram Rathod", time: "5:30 PM", type: "In-person" }
  ]
};