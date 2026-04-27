import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./home-map.css";
import { BASE_URL } from "@/api/base-url";

const SIZES = [38, 44, 36, 42, 34, 40];

const HomeMap = ({ courseCode }) => {
  const [mapData, setMapData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const { data: apiData, isLoading, isError } = useQuery({
    queryKey: ["student-map-data", courseCode],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getAllPassoutStudentsMap`);
      return res.data;
    },
  });

  useEffect(() => {
    if (apiData) {
      const studentImageUrlObj = apiData.image_url?.find(
        (item) => item.image_for === "Student"
      );
      const studentImageUrl = studentImageUrlObj?.image_url || "";
      setMapData(apiData.data);
      setImageUrl(studentImageUrl);
    }
  }, [apiData]);

  // Parse coordinates properly: handle N/S/E/W
  const parseCoordinate = (coord) => {
    if (!coord) return NaN;
    const value = parseFloat(coord);
    if (isNaN(value)) return NaN;
    if (coord.includes("S") || coord.includes("W")) {
      return -Math.abs(value);
    }
    return Math.abs(value);
  };

  useEffect(() => {
    if (!mapData || !imageUrl) return;

    const container = L.DomUtil.get("map");
    if (container && container._leaflet_id) container._leaflet_id = null;

    const map = L.map("map", {
      center: [20, 0],
      zoom: 2,
      zoomSnap: 0.25,
      maxBoundsViscosity: 0.5,
      worldCopyJump: false,
      minZoom: 2,
      maxZoom: 18,
    });

    const verticalBounds = L.latLngBounds(
      L.latLng(-70, -Infinity),
      L.latLng(85, Infinity)
    );
    map.setMaxBounds(verticalBounds);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
        subdomains: "abcd",
        minZoom: 2,
        maxZoom: 20,
        noWrap: false,
        continuousWorld: true,
      }
    ).addTo(map);

    const layerGroup = L.layerGroup();

    const makeAvatarIcon = (student, index) => {
      const size = SIZES[index % SIZES.length];
      const html = `
        <div style="
          width:${size}px;
          height:${size}px;
          border-radius:50%;
          overflow:hidden;
          border:2.5px solid #fff;
          box-shadow:0 3px 10px rgba(0,0,0,0.28);
          background:#e5e7eb;
          cursor:pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        " class="avatar-marker-img">
          <img
            src="${student.imageUrl}"
            alt="${student.name}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            loading="lazy"
          />
        </div>
      `;
      return L.divIcon({
        className: "avatar-icon-wrapper",
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 6)],
      });
    };

    const singlePopupHTML = (student, countryName) => `
      <div class="popup" style="min-width:120px;text-align:center;">
        <h4>${countryName}</h4>
        <div style="margin-top:8px;">
          <div class="card" style="margin:auto;width:90px;">
            <img class="thumb" src="${student.imageUrl}" alt="${student.name}" loading="lazy">
            <div class="course-name">${student.course}</div>
            <div class="caption">${student.name}</div>
          </div>
        </div>
      </div>
    `;

    const allLatLngs = [];

    mapData.forEach((student, index) => {
      const lat = parseCoordinate(student.country_latitude);
      const lng = parseCoordinate(student.country_longitude);

      if (isNaN(lat) || isNaN(lng)) return;

      const studentData = {
        name: student.student_name,
        course: student.student_course,
        imageUrl: `${imageUrl}${student.student_image}`,
        lat,
        lng,
      };

      const icon = makeAvatarIcon(studentData, index);
      const popupHtml = singlePopupHTML(studentData, student.country_name || "Unknown");

      const marker = L.marker([lat, lng], { icon });

      marker.bindPopup(popupHtml, {
        minWidth: 130,
        maxWidth: 180,
        closeButton: false,
        autoClose: true,
        closeOnClick: true,
      });

      marker.on("click", function () {
        map.setView([lat, lng], 6, { animate: true });
        this.openPopup();
      });

      marker.on("mouseover", function () {
        this.openPopup();
      });

      marker.on("mouseout", function (e) {
        const popupEl = this.getPopup()?.getElement();
        if (
          popupEl &&
          e.originalEvent?.relatedTarget &&
          popupEl.contains(e.originalEvent.relatedTarget)
        )
          return;
        this.closePopup();
      });

      marker.on("popupopen", function () {
        const popupEl = this.getPopup()?.getElement();
        if (!popupEl) return;
        const self = this;
        popupEl._mouseoutHandler = function (e) {
          if (!popupEl.contains(e.relatedTarget)) self.closePopup();
        };
        popupEl.addEventListener("mouseleave", popupEl._mouseoutHandler);
      });

      marker.on("popupclose", function () {
        const popupEl = this.getPopup()?.getElement();
        if (popupEl?._mouseoutHandler) {
          popupEl.removeEventListener("mouseleave", popupEl._mouseoutHandler);
        }
      });

      layerGroup.addLayer(marker);
      allLatLngs.push([lat, lng]);
    });

    layerGroup.addTo(map);

    if (allLatLngs.length) {
      const bounds = L.latLngBounds(allLatLngs);
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.25), { maxZoom: 4 });
    }

    return () => map.remove();
  }, [mapData, imageUrl]);

  if (isLoading) {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Skeleton height="100%" width="100%" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-red-500">
          Error loading map data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div
      id="map"
      style={{ height: "60vh", width: "95.5%" }}
      className="mx-auto"
    />
  );
};

export default HomeMap;
