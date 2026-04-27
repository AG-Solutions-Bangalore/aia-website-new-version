// import { useEffect, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/leaflet.markercluster.js";
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import "../map.css";
// import { BASE_URL } from "@/api/base-url";

// const MAX_PHOTOS = 6;

// const CiaMap = () => {
//   const [mapData, setMapData] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const {
//     data: apiData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["student-map-data"],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${BASE_URL}/api/getPassoutStudentsMapbyCourse/CIAC`,
//       );
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (apiData) {
//       const studentImageUrlObj = apiData.image_url?.find(
//         (item) => item.image_for === "Student",
//       );
//       const studentImageUrl = studentImageUrlObj?.image_url || "";

//       setMapData(apiData.data);
//       setImageUrl(studentImageUrl);
//     }
//   }, [apiData]);

//   useEffect(() => {
//     if (!mapData || !imageUrl) return;

//     const container = L.DomUtil.get("map");
//     if (container && container._leaflet_id) {
//       container._leaflet_id = null;
//     }

//     const makePin = () => {
//       const svg = `
//     <svg width="46" height="64" viewBox="0 0 46 64">
//       <path fill="#50648e" d="M23 0C10.3 0 0 10.3 0 23c0 16.3 18.8 36.6 22.5 40.5a1 1 0 0 0 1.4 0C27.2 59.6 46 39.3 46 23 46 10.3 35.7 0 23 0z"/>
//       <circle cx="23" cy="23" r="8" fill="#ffffff"/>
//     </svg>
//   `;

//       return L.divIcon({
//         className: "pin-icon",
//         html: svg,
//         iconSize: [40, 54],
//         iconAnchor: [20, 54],
//         popupAnchor: [0, -48],
//       });
//     };

//     const brandPin = makePin();
//     const map = L.map("map", {
//       center: [20, 0],
//       zoom: 2,
//       zoomSnap: 0.25,
//       maxBoundsViscosity: 0.5,
//       worldCopyJump: false,
//       minZoom: 2,
//       maxZoom: 18,
//     });

//     const verticalBounds = L.latLngBounds(
//       L.latLng(-70, -Infinity),
//       L.latLng(85, Infinity),
//     );
//     map.setMaxBounds(verticalBounds);

//     L.tileLayer(
//       "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
//       {
//         attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
//         subdomains: "abcd",
//         minZoom: 2,
//         maxZoom: 20,
//         noWrap: false,
//         continuousWorld: true,
//       },
//     ).addTo(map);

//     const cluster = L.markerClusterGroup({
//       showCoverageOnHover: false,
//       spiderfyOnMaxZoom: true,
//       disableClusteringAtZoom: 6,
//       iconCreateFunction: (cluster) => {
//         return L.divIcon({
//           html: `<div><span>${cluster.getChildCount()}</span></div>`,
//           className: "marker-cluster marker-cluster-large",
//           iconSize: [46, 46],
//         });
//       },
//     });

//     const markerOriginalLngs = new Map();
//     let lastUpdateLng = null;

//     map.on("move", function () {
//       const mapCenterLng = map.getCenter().lng;

//       if (
//         lastUpdateLng === null ||
//         Math.abs(mapCenterLng - lastUpdateLng) > 90
//       ) {
//         cluster.getLayers().forEach((marker) => {
//           const originalLng = markerOriginalLngs.get(marker);
//           if (originalLng !== undefined) {
//             let newLng = originalLng;

//             while (newLng - mapCenterLng > 180) {
//               newLng -= 360;
//             }
//             while (newLng - mapCenterLng < -180) {
//               newLng += 360;
//             }

//             const latLng = marker.getLatLng();
//             if (Math.abs(newLng - latLng.lng) > 1) {
//               marker.setLatLng([latLng.lat, newLng]);
//             }
//           }
//         });
//         lastUpdateLng = mapCenterLng;
//       }
//     });

//     function galleryHTML(regionTitle, students) {
//       let columns = 1;
//       if (students.length === 2) columns = 2;
//       else if (students.length >= 3) columns = 3;

//       const cards = students
//         .slice(0, MAX_PHOTOS)
//         .map(
//           (student) => `
//         <div class="card">
//           <img
//             class="thumb"
//             src="${student.imageUrl}"
//             alt="${student.name}"
//             loading="lazy"
//           >
//           <div class="course-name">${student.course}</div>
//           <div class="caption">${student.name}</div>
//         </div>
//       `,
//         )
//         .join("");

//       return `
//     <div class="popup">
//       <h4>${regionTitle}</h4>
//       <div class="gallery cols-${columns}">
//         ${cards}
//       </div>
//     </div>
//   `;
//     }

//     // Group students by country
//     const groupedByCountry = {};
//     mapData.forEach((student) => {
//       const country = student.country_name || "Unknown";
//       if (!groupedByCountry[country]) {
//         groupedByCountry[country] = [];
//       }

//       groupedByCountry[country].push({
//         name: student.student_name,
//         course: student.student_course,
//         imageUrl: `${imageUrl}${student.student_image}`,
//         lat: parseFloat(student.country_latitude),
//         lng: parseFloat(student.country_longitude),
//       });
//     });

//     Object.keys(groupedByCountry).forEach((country) => {
//       const students = groupedByCountry[country];
//       if (students.length === 0) return;

//       const firstStudent = students[0];
//       const coords = [firstStudent.lat, firstStudent.lng];

//       if (isNaN(coords[0]) || isNaN(coords[1])) {
//         console.warn(`Invalid coordinates for ${country}:`, coords);
//         return;
//       }

//       const popupHtml = galleryHTML(country, students);

//       let minWidth = 160;
//       let maxWidth = 160;

//       if (students.length == 2) {
//         minWidth = 260;
//         maxWidth = 360;
//       } else if (students.length >= 3) {
//         minWidth = 360;
//         maxWidth = 360;
//       }

//       const marker = L.marker(coords, { icon: brandPin });
//       markerOriginalLngs.set(marker, coords[1]);

//       marker.bindPopup(popupHtml, {
//         minWidth,
//         maxWidth,
//       });

//       marker.on("mouseover", function () {
//         this.openPopup();
//       });
//       marker.on("mouseout", function () {
//         this.closePopup();
//       });

//       cluster.addLayer(marker);
//     });

//     map.addLayer(cluster);

//     if (cluster.getLayers().length) {
//       const bounds = cluster.getBounds();
//       if (bounds.isValid()) {
//         map.fitBounds(bounds.pad(0.25), { maxZoom: 4 });
//       }
//     }

//     return () => {
//       map.remove();
//     };
//   }, [mapData, imageUrl]);

//   if (isLoading) {
//     return (
//       <div style={{ height: "100vh", width: "100%", position: "relative" }}>
//         <Skeleton height="100%" width="100%" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div className="text-red-500">
//           Error loading map data. Please try again later.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       id="map"
//       style={{ height: "70vh", width: "95.5%" }}
//       className="mx-auto"
//     />
//   );
// };

// export default CiaMap;
