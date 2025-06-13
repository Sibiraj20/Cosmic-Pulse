from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import aiohttp
import asyncio
from skyfield.api import load, wgs84, EarthSatellite
from skyfield.timelib import Time
import numpy as np

# Load environment variables
load_dotenv()

app = FastAPI(title="Cosmic Pulse API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = "E0ah5lkk1GumjqpJelJaWbrgPFG2NAZcz5xURpse"  # Your NASA API key

# Helper function for NASA API calls
async def fetch_nasa_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            raise HTTPException(status_code=response.status, detail="NASA API error")

@app.get("/")
def read_root():
    return {"message": "Welcome to Cosmic Pulse backend!"}

@app.get("/api/apod")
async def get_apod():
    """Get Astronomy Picture of the Day"""
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}"
    return await fetch_nasa_data(url)

@app.get("/api/neo")
async def get_neo():
    """Get Near Earth Objects"""
    today = datetime.now()
    url = f"https://api.nasa.gov/neo/rest/v1/feed?start_date={today.date()}&end_date={today.date()}&api_key={NASA_API_KEY}"
    return await fetch_nasa_data(url)

@app.get("/api/eonet")
async def get_eonet():
    """Get Earth events from EONET"""
    url = "https://eonet.gsfc.nasa.gov/api/v3/events"
    return await fetch_nasa_data(url)

@app.get("/api/donki")
async def get_donki():
    """Get space weather data from DONKI"""
    url = f"https://api.nasa.gov/DONKI/notifications?api_key={NASA_API_KEY}"
    return await fetch_nasa_data(url)

@app.get("/api/epic")
async def get_epic():
    """Get Earth image from EPIC"""
    url = f"https://api.nasa.gov/EPIC/api/natural?api_key={NASA_API_KEY}"
    return await fetch_nasa_data(url)

@app.get("/api/mars")
async def get_mars_weather():
    """Get Mars weather data"""
    url = "https://api.nasa.gov/insight_weather/?api_key=" + NASA_API_KEY + "&feedtype=json&ver=1.0"
    return await fetch_nasa_data(url)

@app.get("/api/exoplanets")
async def get_exoplanets():
    """Get exoplanet data"""
    url = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,disc_year,pl_orbper,pl_rade,pl_bmasse+from+ps+where+disc_year>2020&format=json"
    return await fetch_nasa_data(url)

@app.get("/api/tle/{satellite_id}")
async def get_tle(satellite_id: str):
    """Get satellite TLE data and calculate current position"""
    url = f"https://tle.ivanstanojevic.me/api/tle/{satellite_id}"
    try:
        response = await fetch_nasa_data(url)
        print(f"TLE API Response: {response}")  # Debug log
        
        # Extract TLE lines directly from the response
        line1 = response.get('line1')
        line2 = response.get('line2')
        
        if not line1 or not line2:
            raise HTTPException(status_code=500, detail="Invalid TLE data received")
        
        print(f"TLE Line 1: {line1}")  # Debug log
        print(f"TLE Line 2: {line2}")  # Debug log
        
        try:
            # Create satellite object from TLE data using EarthSatellite
            satellite = EarthSatellite(line1, line2)
            
            # Get current time
            ts = load.timescale()
            now = ts.now()
            
            # Calculate satellite position
            geocentric = satellite.at(now)
            lat, lon = wgs84.latlon_of(geocentric)
            
            # Calculate altitude and velocity
            subpoint = wgs84.subpoint_of(geocentric)
            altitude = subpoint.elevation.km
            
            # Calculate velocity magnitude from the velocity vector
            velocity_vector = geocentric.velocity.km_per_s
            velocity = np.sqrt(np.sum(velocity_vector ** 2))
            
            result = {
                "latitude": float(lat.degrees),
                "longitude": float(lon.degrees),
                "altitude": round(altitude, 2),
                "velocity": round(velocity, 2)
            }
            print(f"Calculated position: {result}")  # Debug log
            return result
            
        except Exception as calc_error:
            print(f"Error calculating satellite position: {str(calc_error)}")
            raise HTTPException(status_code=500, detail=f"Error calculating satellite position: {str(calc_error)}")
            
    except Exception as e:
        error_msg = f"Error processing TLE data: {str(e)}"
        print(error_msg)  # Debug log
        raise HTTPException(status_code=500, detail=error_msg)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 