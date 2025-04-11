export const packages = {
    adventure: [
        {
            _id: "1",
            name: "Rishikesh Adventure Package",
            description: "Experience the thrill of white-water rafting, bungee jumping, and trekking in the adventure capital of India.",
            image: ["/assets/adventure/rishikesh/rishikesh.jpg"],
            packageDetails: {
                totalDays: 5,
                totalCost: 15000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 20,
                bookedSlots: 5,
            },
            language: "English/Hindi",
            location: "Rishikesh",
            customizePackage: true
        },
        {
            _id: "2",
            name: "Spiti Valley offroad Bike Trip ",
            description: "A high-altitude adventure through rugged terrains, scenic monasteries, and breathtaking landscapes.",
            image: ["/assets/adventure/meghalaya.jpg"],
            packageDetails: {
                totalDays: 7,
                totalCost: 25000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 15,
                bookedSlots: 3,
            },
            language: "English/Hindi",
            location: "Spiti",
            customizePackage: false
        },
        {
            _id: "3",
            name: "Meghalaya Caving Expedition",
            description: "Explore the hidden caves of Meghalaya with expert guides, rock climbing, and breathtaking waterfalls.",
            image: ["/assets/adventure/spiti (2).jpg"],
            packageDetails: {
                totalDays: 6,
                totalCost: 18000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 10,
                bookedSlots: 2,
            },
            language: "English/Hindi",
            location: "Meghalaya",
            customizePackage: true
        },
        {
            _id: "4",
            name: "Andaman Scuba Diving Package",
            description: "Discover the underwater paradise of Andaman with world-class scuba diving, snorkeling, and island hopping.",
            image: ["/assets/adventure/andaman.jpg"],
            packageDetails: {
                totalDays: 5,
                totalCost: 30000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 12,
                bookedSlots: 4,
            },
            language: "English/Hindi",
            location: "Andaman",
            customizePackage: true
        },
        {
            _id: "5",
            name: "Meghalaya Caving Expedition",
            description: "Explore the hidden caves of Meghalaya with expert guides, rock climbing, and breathtaking waterfalls.",
            image: ["/assets/adventure/spiti (2).jpg"],
            packageDetails: {
                totalDays: 6,
                totalCost: 18000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 10,
                bookedSlots: 2,
            },
            language: "English/Hindi",
            location: "Meghalaya",
            customizePackage: false
        },
        {
            _id: "6",
            name: "Andaman Scuba Diving Package",
            description: "Discover the underwater paradise of Andaman with world-class scuba diving, snorkeling, and island hopping.",
            image: ["/assets/adventure/andaman.jpg"],
            packageDetails: {
                totalDays: 5,
                totalCost: 30000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Ganga Aarti" },
                    { key: "2", day: "Day 2", activities: "Rafting & Camping" },
                    { key: "3", day: "Day 3", activities: "Bungee Jumping & Trekking" },
                    { key: "4", day: "Day 4", activities: "Local Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "adventure",
            availability: {
                totalSlots: 12,
                bookedSlots: 4,
            },
            language: "English/Hindi",
            location: "Andaman",
            customizePackage: true
        },
    ],


    luxury: [
        {
            _id: "7",
            name: "Maldives Overwater Villa Escape",
            description: "Stay in a luxury overwater villa with private infinity pool and premium spa treatments.",
            image: ["/assets/luxury/maldives.jpg"],
            packageDetails: {
                totalDays: 5,
                totalCost: 90000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Sunset Dinner" },
                    { key: "2", day: "Day 2", activities: "Private Beach & Spa" },
                    { key: "3", day: "Day 3", activities: "Snorkeling & Diving" },
                    { key: "4", day: "Day 4", activities: "Luxury Yacht Cruise" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "luxury",
            availability: {
                totalSlots: 10,
                bookedSlots: 2,
            },
            language: "English",
            location: "Maldives",
            customizePackage: false
        },
        {
            _id: "8",
            name: "Dubai Ultra-Luxury Stay",
            description: "Experience the pinnacle of luxury with a stay in a sky-high suite, private shopping tours, and gourmet dining.",
            image: ["/assets/luxury/dubai.jpg"],
            packageDetails: {
                totalDays: 4,
                totalCost: 120000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Private Burj Khalifa Tour" },
                    { key: "2", day: "Day 2", activities: "Luxury Shopping & Desert Safari" },
                    { key: "3", day: "Day 3", activities: "Helicopter Tour & Fine Dining" },
                    { key: "4", day: "Day 4", activities: "Departure" },
                ],
            },
            packageType: "luxury",
            availability: {
                totalSlots: 8,
                bookedSlots: 1,
            },
            language: "English/Arabic",
            location: "Dubai",
            customizePackage: true
        },
        {
            _id: "9",
            name: "Swiss Alps Premium Experience",
            description: "Indulge in a luxurious alpine retreat with private ski lessons, gourmet Swiss cuisine, and breathtaking mountain views.",
            image: ["/assets/luxury/swiss_alps.jpg"],
            packageDetails: {
                totalDays: 6,
                totalCost: 150000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Luxury Chalet Check-in" },
                    { key: "2", day: "Day 2", activities: "Private Skiing & Snowboarding" },
                    { key: "3", day: "Day 3", activities: "Gourmet Swiss Cuisine & Wine Tasting" },
                    { key: "4", day: "Day 4", activities: "Scenic Train Journey & Spa" },
                    { key: "5", day: "Day 5", activities: "Helicopter Tour of the Alps" },
                    { key: "6", day: "Day 6", activities: "Departure" },
                ],
            },
            packageType: "luxury",
            availability: {
                totalSlots: 6,
                bookedSlots: 3,
            },
            language: "English/German/French",
            location: "Swiss Alps",
            customizePackage: false
        },
        {
            _id: "10",
            name: "Bali Five-Star Retreat",
            description: "Relax in a private villa with infinity pool, enjoy traditional Balinese spa treatments, and explore the island's cultural richness.",
            image: ["/assets/luxury/bali.jpg"],
            packageDetails: {
                totalDays: 7,
                totalCost: 110000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Private Villa Check-in" },
                    { key: "2", day: "Day 2", activities: "Balinese Spa & Yoga Session" },
                    { key: "3", day: "Day 3", activities: "Ubud Cultural Tour & Rice Terraces" },
                    { key: "4", day: "Day 4", activities: "Private Beach & Water Activities" },
                    { key: "5", day: "Day 5", activities: "Cooking Class & Temple Visit" },
                    { key: "6", day: "Day 6", activities: "Sunset Dinner Cruise" },
                    { key: "7", day: "Day 7", activities: "Departure" },
                ],
            },
            packageType: "luxury",
            availability: {
                totalSlots: 12,
                bookedSlots: 5,
            },
            language: "English/Indonesian",
            location: "Bali",
            customizePackage: true
        },
    ],


    family: [
        {
            _id: "11",
            name: "Disneyland Paris Family Vacation",
            description: "A magical trip to Disneyland Paris with fun rides, shows, and character meetups.",
            image: ["/assets/family/disneyland.jpg"],
            packageDetails: {
                totalDays: 6,
                totalCost: 70000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Park Entry" },
                    { key: "2", day: "Day 2", activities: "Disneyland Park Exploration" },
                    { key: "3", day: "Day 3", activities: "Walt Disney Studios Tour" },
                    { key: "4", day: "Day 4", activities: "City Tour of Paris" },
                    { key: "5", day: "Day 5", activities: "Shopping & Relaxation" },
                ],
            },
            packageType: "family",
            availability: {
                totalSlots: 20,
                bookedSlots: 5,
            },
            language: "English/French",
            location: "Paris, France",
            customizePackage: false
        },
        {
            _id: "12",
            name: "Kerala Houseboat Family Getaway",
            description: "Relaxing houseboat experience through Kerala's backwaters with traditional meals and scenic views.",
            image: ["/assets/family/kerala_houseboat.jpg"],
            packageDetails: {
                totalDays: 4,
                totalCost: 45000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Houseboat Check-in" },
                    { key: "2", day: "Day 2", activities: "Backwater Cruise & Village Visit" },
                    { key: "3", day: "Day 3", activities: "Traditional Kerala Meals & Fishing" },
                    { key: "4", day: "Day 4", activities: "Departure" },
                ],
            },
            packageType: "family",
            availability: {
                totalSlots: 15,
                bookedSlots: 8,
            },
            language: "English/Malayalam",
            location: "Kerala, India",
            customizePackage: true
        },
        {
            _id: "13",
            name: "Singapore Universal Studios Tour",
            description: "Exciting family trip to Universal Studios Singapore with thrilling rides and entertainment.",
            image: ["/assets/family/universal_singapore.jpg"],
            packageDetails: {
                totalDays: 5,
                totalCost: 80000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival & Hotel Check-in" },
                    { key: "2", day: "Day 2", activities: "Universal Studios Singapore Day 1" },
                    { key: "3", day: "Day 3", activities: "Universal Studios Singapore Day 2" },
                    { key: "4", day: "Day 4", activities: "Gardens by the Bay & City Tour" },
                    { key: "5", day: "Day 5", activities: "Departure" },
                ],
            },
            packageType: "family",
            availability: {
                totalSlots: 25,
                bookedSlots: 12,
            },
            language: "English/Mandarin",
            location: "Singapore",
            customizePackage: false
        },
        {
            _id: "14",
            name: "Japan Cherry Blossom Family Tour",
            description: "Experience the beauty of Japan's cherry blossoms with cultural visits and family-friendly activities.",
            image: ["/assets/family/japan_cherry_blossom.jpg"],
            packageDetails: {
                totalDays: 7,
                totalCost: 100000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival in Tokyo & Hotel Check-in" },
                    { key: "2", day: "Day 2", activities: "Tokyo Cherry Blossom Viewing & Park Visit" },
                    { key: "3", day: "Day 3", activities: "Cultural Experience & Temple Visit" },
                    { key: "4", day: "Day 4", activities: "Bullet Train to Kyoto & Sightseeing" },
                    { key: "5", day: "Day 5", activities: "Kyoto Cherry Blossom Viewing & Gardens" },
                    { key: "6", day: "Day 6", activities: "Family-Friendly Activities & Shopping" },
                    { key: "7", day: "Day 7", activities: "Departure" },
                ],
            },
            packageType: "family",
            availability: {
                totalSlots: 18,
                bookedSlots: 10,
            },
            language: "English/Japanese",
            location: "Japan",
            customizePackage: true
        },
    ],


    solo: [
        {
            _id: "15",
            name: "Backpacking Through Vietnam",
            description: "A solo backpacking journey across Vietnam’s scenic landscapes and vibrant cities.",
            image: ["/assets/solo/vietnam.jpg"],
            packageDetails: {
                totalDays: 10,
                totalCost: 50000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival in Hanoi" },
                    { key: "2", day: "Day 2", activities: "Explore Halong Bay" },
                    { key: "3", day: "Day 3", activities: "Travel to Hoi An" },
                    { key: "4", day: "Day 4", activities: "Nightlife in Ho Chi Minh City" },
                    { key: "5", day: "Day 5", activities: "Cu Chi Tunnels Tour" },
                ],
            },
            packageType: "solo",
            availability: {
                totalSlots: 10,
                bookedSlots: 1,
            },
            language: "English/Vietnamese",
            location: "Vietnam",
            customizePackage: true
        },
        {
            _id: "16",
            name: "Himalayan Solo Trekking",
            description: "Embark on a challenging yet rewarding solo trek through the Himalayas, experiencing stunning mountain vistas and serene nature.",
            image: ["/assets/solo/himalayan_trek.jpg"],
            packageDetails: {
                totalDays: 7,
                totalCost: 35000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival in Kathmandu" },
                    { key: "2", day: "Day 2", activities: "Trek Preparation & Briefing" },
                    { key: "3", day: "Day 3", activities: "Trek to Base Camp" },
                    { key: "4", day: "Day 4", activities: "Acclimatization & Exploration" },
                    { key: "5", day: "Day 5", activities: "Summit Day" },
                    { key: "6", day: "Day 6", activities: "Descent & Rest" },
                    { key: "7", day: "Day 7", activities: "Departure" },
                ],
            },
            packageType: "solo",
            availability: {
                totalSlots: 8,
                bookedSlots: 3,
            },
            language: "English/Nepali",
            location: "Nepal",
            customizePackage: false
        },
        {
            _id: "17",
            name: "Exploring Japan’s Temples & Traditions",
            description: "Immerse yourself in Japan's rich culture and history with visits to ancient temples, traditional gardens, and serene landscapes.",
            image: ["/assets/solo/japan_temples.jpg"],
            packageDetails: {
                totalDays: 9,
                totalCost: 60000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival in Kyoto" },
                    { key: "2", day: "Day 2", activities: "Fushimi Inari Shrine & Kiyomizu-dera Temple" },
                    { key: "3", day: "Day 3", activities: "Arashiyama Bamboo Forest & Tenryu-ji Temple" },
                    { key: "4", day: "Day 4", activities: "Travel to Nara & Todai-ji Temple" },
                    { key: "5", day: "Day 5", activities: "Osaka Castle & Dotonbori District" },
                    { key: "6", day: "Day 6", activities: "Hiroshima Peace Memorial Park & Miyajima Island" },
                    { key: "7", day: "Day 7", activities: "Travel to Hakone & Open-Air Museum" },
                    { key: "8", day: "Day 8", activities: "Mount Fuji Views & Hot Springs Experience" },
                    { key: "9", day: "Day 9", activities: "Departure" },
                ],
            },
            packageType: "solo",
            availability: {
                totalSlots: 12,
                bookedSlots: 5,
            },
            language: "English/Japanese",
            location: "Japan",
            customizePackage: false
        },
        {
            _id: "18",
            name: "Solo Digital Nomad Bali Adventure",
            description: "Combine work and play with this Bali adventure designed for digital nomads, featuring co-working spaces, cultural experiences, and beach relaxation.",
            image: ["/assets/solo/bali_digital_nomad.jpg"],
            packageDetails: {
                totalDays: 14,
                totalCost: 70000,
                tripPlan: [
                    { key: "1", day: "Day 1", activities: "Arrival in Canggu & Co-working Space Setup" },
                    { key: "2", day: "Day 2", activities: "Explore Canggu's Cafes & Beaches" },
                    { key: "3", day: "Day 3", activities: "Ubud Monkey Forest & Rice Terraces" },
                    { key: "4", day: "Day 4", activities: "Yoga Retreat & Wellness Activities" },
                    { key: "5", day: "Day 5", activities: "Nusa Islands Hopping & Snorkeling" },
                    { key: "6", day: "Day 6", activities: "Cultural Immersion & Temple Visit" },
                    { key: "7", day: "Day 7", activities: "Co-working & Networking Events" },
                    { key: "8", day: "Day 8", activities: "Surf Lessons & Beach Relaxation" },
                    { key: "9", day: "Day 9", activities: "Explore Uluwatu & Kecak Dance Performance" },
                    { key: "10", day: "Day 10", activities: "Volcano Hike & Hot Springs" },
                    { key: "11", day: "Day 11", activities: "Free Time & Co-working" },
                    { key: "12", day: "Day 12", activities: "Cooking Class & Balinese Cuisine" },
                    { key: "13", day: "Day 13", activities: "Farewell Dinner & Networking" },
                    { key: "14", day: "Day 14", activities: "Departure" },
                ],
            },
            packageType: "solo",
            availability: {
                totalSlots: 15,
                bookedSlots: 6,
            },
            language: "English/Indonesian",
            location: "Bali, Indonesia",
            customizePackage: true
        },
    ],

};


