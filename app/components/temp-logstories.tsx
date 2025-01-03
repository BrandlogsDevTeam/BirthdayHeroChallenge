"use server";
import React from 'react'

const TempLogStories = () => {
    return (
        <div id="otherContent" className="space-y-8">

            <div className="max-w-2xl mx-auto">

                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4">

                        <div className="flex justify-between items-center mb-4">
                            <a href="/guest/profiles.html" className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Brandlogs</p>
                                    <p className="text-sm text-gray-600">
                                        @birthdayherochallenge
                                    </p>
                                </div>
                            </a>
                            <button className="px-4 py-2 bg-custom-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Connect
                            </button>
                        </div>


                        <p className="text-gray-600 mb-4">
                            Welcome to the age of hunger liberation! Redefining hunger
                            philanthropy for 8 billion people!
                        </p>


                        <div className="post-carousel">
                            <div className="relative h-[400px]">

                                <div className="carousel-images relative h-full overflow-hidden rounded-lg">

                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 1, zIndex: 10}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg" alt="Event Image 1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday2.jpg" alt="Event Image 2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday3.jpg" alt="Event Image 3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday4.jpg" alt="Event Image 4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday5.jpg" alt="Event Image 5" className="w-full h-full object-cover" />
                                    </div>


                                    <button className="prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                    </button>
                                    <button className="next-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>


                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                                        <div className="flex items-end lg:items-end justify-between gap-3 lg:gap-4">

                                            <div className="flex flex-col md:flex-row gap-1 items-end">
                                                <div className="flex flex-col ml-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                                        Birthday Hero Challenge
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
                                                        <svg className="svg-inline--fa fa-calendar-days text-custom-blue" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path></svg>
                                                        <span>1st Jan, 2025 - 31st Dec, 2029</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col lg:flex-row items-end gap-3 lg:gap-4">
                                                <div className="avatar-group flex -space-x-3 sm:-space-x-4 rtl:space-x-reverse">
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar placeholder w-8 h-8 sm:w-10 sm:h-10">
                                                        <div className="bg-gray-100 text-gray-500 w-full h-full">
                                                            <span className="text-[10px] sm:text-xs">+78</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="carousel-dots flex justify-center mt-2 space-x-2 absolute bottom-16 left-0 right-0 z-50">
                                    <button className="w-4 h-2 rounded-full bg-custom-blue"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between px-6 sm:px-28 gap-8 sm:gap-4 mt-4 sm:mt-0">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                <span className="text-sm font-medium">124</span>
                                <span className="text-xs">Logs</span>
                            </button>
                            <button data-onclick="window.location.href='./chats/trending.html'" className="flex items-center gap-1 text-gray-600 hover:text-custom-orange transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="text-sm font-medium">45</span>
                                <span className="text-xs">Chats</span>
                            </button>

                            <div className="flex space-x-2 md:space-x-4 z-20">
                                <div className="relative">
                                    <button data-onclick="document.querySelector('.invitation-options').showModal()" className="share-profile-btn flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors" aria-label="Invite friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                                            <path d="M12 3v16"></path>
                                            <path d="m17 8-5-5-5 5"></path>
                                        </svg>
                                        <span className="text-sm font-medium">18</span>
                                        <span className="text-xs">Share</span>
                                    </button>


                                    <div className="share-options hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                        <a href="#" data-onclick="shareViaWhatsApp()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                            </svg>
                                            WhatsApp
                                        </a>


                                        <a href="#" data-onclick="shareViaTelegram()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#0088cc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                                            </svg>
                                            Telegram
                                        </a>


                                        <a data-onclick="copyInviteLink()" className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75V3.75zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H8.774z"></path>
                                                <path d="M1.995 6.225a.75.75 0 0 1 .75-.75H4.75v11.498c0 1.242 1.008 2.25 2.25 2.25h11.498v2.005a.75.75 0 0 1-.75.75H4.25c-1.242 0-2.25-1.008-2.25-2.25V6.225z"></path>
                                            </svg>
                                            Copy Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4">

                        <div className="flex justify-between items-center mb-4">
                            <a href="./profiles.html" className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Brandlogs</p>
                                    <p className="text-sm text-gray-600">
                                        @birthdayherochallenge
                                    </p>
                                </div>
                            </a>
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="px-4 py-2 bg-custom-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Connect
                            </button>
                        </div>


                        <p className="text-gray-600 mb-4">
                            Hey guys! I can't wait to turn 20 this year as I impact lives
                            through My Hunger Hero Challenge.
                        </p>


                        <div className="post-carousel">
                            <div className="relative h-[400px]">

                                <div className="carousel-images relative h-full overflow-hidden rounded-lg">

                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 1, zIndex: 10}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg" alt="Event Image 1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday2.jpg" alt="Event Image 2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday3.jpg" alt="Event Image 3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday4.jpg" alt="Event Image 4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday5.jpg" alt="Event Image 5" className="w-full h-full object-cover" />
                                    </div>


                                    <button className="prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                    </button>
                                    <button className="next-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>


                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                                        <div className="flex items-end lg:items-end justify-between gap-3 lg:gap-4">

                                            <div className="flex flex-col md:flex-row gap-1 items-end">
                                                <div className="flex flex-col ml-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                                        Birthday Hero Challenge
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
                                                        <svg className="svg-inline--fa fa-calendar-days text-custom-blue" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path></svg>
                                                        <span>1st Jan, 2025 - 31st Dec, 2029</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col lg:flex-row items-end gap-3 lg:gap-4">
                                                <div className="avatar-group flex -space-x-3 sm:-space-x-4 rtl:space-x-reverse">
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar placeholder w-8 h-8 sm:w-10 sm:h-10">
                                                        <div className="bg-gray-100 text-gray-500 w-full h-full">
                                                            <span className="text-[10px] sm:text-xs">+78</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="carousel-dots flex justify-center mt-2 space-x-2 absolute bottom-16 left-0 right-0 z-50">
                                    <button className="w-4 h-2 rounded-full bg-custom-blue"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between px-6 sm:px-28 gap-8 sm:gap-4 mt-4 sm:mt-0">
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                <span className="text-sm font-medium">124</span>
                                <span className="text-xs">Logs</span>
                            </button>
                            <button data-onclick="window.location.href='./chats/trending.html'" className="flex items-center gap-1 text-gray-600 hover:text-custom-orange transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="text-sm font-medium">45</span>
                                <span className="text-xs">Chats</span>
                            </button>

                            <div className="flex space-x-2 md:space-x-4 z-20">
                                <div className="relative">
                                    <button data-onclick="document.querySelector('.invitation-options').showModal()" className="share-profile-btn flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors" aria-label="Invite friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                                            <path d="M12 3v16"></path>
                                            <path d="m17 8-5-5-5 5"></path>
                                        </svg>
                                        <span className="text-sm font-medium">18</span>
                                        <span className="text-xs">Share</span>
                                    </button>


                                    <div className="share-options hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                        <a href="#" data-onclick="shareViaWhatsApp()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                            </svg>
                                            WhatsApp
                                        </a>


                                        <a href="#" data-onclick="shareViaTelegram()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#0088cc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                                            </svg>
                                            Telegram
                                        </a>


                                        <a data-onclick="copyInviteLink()" className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75V3.75zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H8.774z"></path>
                                                <path d="M1.995 6.225a.75.75 0 0 1 .75-.75H4.75v11.498c0 1.242 1.008 2.25 2.25 2.25h11.498v2.005a.75.75 0 0 1-.75.75H4.25c-1.242 0-2.25-1.008-2.25-2.25V6.225z"></path>
                                            </svg>
                                            Copy Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4">

                        <div className="flex justify-between items-center mb-4">
                            <a href="./profiles.html" className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Brandlogs</p>
                                    <p className="text-sm text-gray-600">
                                        @birthdayherochallenge
                                    </p>
                                </div>
                            </a>
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="px-4 py-2 bg-custom-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Connect
                            </button>
                        </div>


                        <p className="text-gray-600 mb-4">
                            Hey guys! I can't wait to turn 20 this year as I impact lives
                            through My Hunger Hero Challenge.
                        </p>



                        <div className="post-carousel">
                            <div className="relative h-[400px]">

                                <div className="carousel-images relative h-full overflow-hidden rounded-lg">

                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 1, zIndex: 10}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg" alt="Event Image 1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday2.jpg" alt="Event Image 2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday3.jpg" alt="Event Image 3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday4.jpg" alt="Event Image 4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday5.jpg" alt="Event Image 5" className="w-full h-full object-cover" />
                                    </div>


                                    <button className="prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                    </button>
                                    <button className="next-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>


                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                                        <div className="flex items-end lg:items-end justify-between gap-3 lg:gap-4">

                                            <div className="flex flex-col md:flex-row gap-1 items-end">
                                                <div className="flex flex-col ml-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                                        Birthday Hero Challenge
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
                                                        <svg className="svg-inline--fa fa-calendar-days text-custom-blue" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path></svg>
                                                        <span>1st Jan, 2025 - 31st Dec, 2029</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col lg:flex-row items-end gap-3 lg:gap-4">
                                                <div className="avatar-group flex -space-x-3 sm:-space-x-4 rtl:space-x-reverse">
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar placeholder w-8 h-8 sm:w-10 sm:h-10">
                                                        <div className="bg-gray-100 text-gray-500 w-full h-full">
                                                            <span className="text-[10px] sm:text-xs">+78</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="carousel-dots flex justify-center mt-2 space-x-2 absolute bottom-16 left-0 right-0 z-50">
                                    <button className="w-4 h-2 rounded-full bg-custom-blue"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between px-6 sm:px-28 gap-8 sm:gap-4 mt-4 sm:mt-0">
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                <span className="text-sm font-medium">124</span>
                                <span className="text-xs">Logs</span>
                            </button>
                            <button data-onclick="window.location.href='./chats/trending.html'" className="flex items-center gap-1 text-gray-600 hover:text-custom-orange transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="text-sm font-medium">45</span>
                                <span className="text-xs">Chats</span>
                            </button>

                            <div className="flex space-x-2 md:space-x-4 z-20">
                                <div className="relative">
                                    <button data-onclick="document.querySelector('.invitation-options').showModal()" className="share-profile-btn flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors" aria-label="Invite friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                                            <path d="M12 3v16"></path>
                                            <path d="m17 8-5-5-5 5"></path>
                                        </svg>
                                        <span className="text-sm font-medium">18</span>
                                        <span className="text-xs">Share</span>
                                    </button>


                                    <div className="share-options hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                        <a href="#" data-onclick="shareViaWhatsApp()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                            </svg>
                                            WhatsApp
                                        </a>


                                        <a href="#" data-onclick="shareViaTelegram()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#0088cc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                                            </svg>
                                            Telegram
                                        </a>


                                        <a data-onclick="copyInviteLink()" className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75V3.75zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H8.774z"></path>
                                                <path d="M1.995 6.225a.75.75 0 0 1 .75-.75H4.75v11.498c0 1.242 1.008 2.25 2.25 2.25h11.498v2.005a.75.75 0 0 1-.75.75H4.25c-1.242 0-2.25-1.008-2.25-2.25V6.225z"></path>
                                            </svg>
                                            Copy Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4">

                        <div className="flex justify-between items-center mb-4">
                            <a href="./profiles.html" className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Brandlogs</p>
                                    <p className="text-sm text-gray-600">
                                        @birthdayherochallenge
                                    </p>
                                </div>
                            </a>
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="px-4 py-2 bg-custom-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Connect
                            </button>
                        </div>


                        <p className="text-gray-600 mb-4">
                            Hey guys! I can't wait to turn 20 this year as I impact lives
                            through My Hunger Hero Challenge.
                        </p>


                        <div className="post-carousel">
                            <div className="relative h-[400px]">

                                <div className="carousel-images relative h-full overflow-hidden rounded-lg">

                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 1, zIndex: 10}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg" alt="Event Image 1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday2.jpg" alt="Event Image 2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday3.jpg" alt="Event Image 3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday4.jpg" alt="Event Image 4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday5.jpg" alt="Event Image 5" className="w-full h-full object-cover" />
                                    </div>


                                    <button className="prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                    </button>
                                    <button className="next-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>


                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                                        <div className="flex items-end lg:items-end justify-between gap-3 lg:gap-4">

                                            <div className="flex flex-col md:flex-row gap-1 items-end">
                                                <div className="flex flex-col ml-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                                        Birthday Hero Challenge
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
                                                        <svg className="svg-inline--fa fa-calendar-days text-custom-blue" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path></svg>
                                                        <span>1st Jan, 2025 - 31st Dec, 2029</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col lg:flex-row items-end gap-3 lg:gap-4">
                                                <div className="avatar-group flex -space-x-3 sm:-space-x-4 rtl:space-x-reverse">
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar placeholder w-8 h-8 sm:w-10 sm:h-10">
                                                        <div className="bg-gray-100 text-gray-500 w-full h-full">
                                                            <span className="text-[10px] sm:text-xs">+78</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="carousel-dots flex justify-center mt-2 space-x-2 absolute bottom-16 left-0 right-0 z-50">
                                    <button className="w-4 h-2 rounded-full bg-custom-blue"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between px-6 sm:px-28 gap-8 sm:gap-4 mt-4 sm:mt-0">
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                <span className="text-sm font-medium">124</span>
                                <span className="text-xs">Logs</span>
                            </button>
                            <button data-onclick="window.location.href='./chats/trending.html'" className="flex items-center gap-1 text-gray-600 hover:text-custom-orange transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="text-sm font-medium">45</span>
                                <span className="text-xs">Chats</span>
                            </button>

                            <div className="flex space-x-2 md:space-x-4 z-20">
                                <div className="relative">
                                    <button data-onclick="document.querySelector('.invitation-options').showModal()" className="share-profile-btn flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors" aria-label="Invite friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                                            <path d="M12 3v16"></path>
                                            <path d="m17 8-5-5-5 5"></path>
                                        </svg>
                                        <span className="text-sm font-medium">18</span>
                                        <span className="text-xs">Share</span>
                                    </button>


                                    <div className="share-options hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                        <a href="#" data-onclick="shareViaWhatsApp()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                            </svg>
                                            WhatsApp
                                        </a>


                                        <a href="#" data-onclick="shareViaTelegram()" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#0088cc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                                            </svg>
                                            Telegram
                                        </a>


                                        <a data-onclick="copyInviteLink()" className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75V3.75zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H8.774z"></path>
                                                <path d="M1.995 6.225a.75.75 0 0 1 .75-.75H4.75v11.498c0 1.242 1.008 2.25 2.25 2.25h11.498v2.005a.75.75 0 0 1-.75.75H4.25c-1.242 0-2.25-1.008-2.25-2.25V6.225z"></path>
                                            </svg>
                                            Copy Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-4">

                        <div className="flex justify-between items-center mb-4">
                            <a href="./profiles.html" className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Brandlogs</p>
                                    <p className="text-sm text-gray-600">
                                        @birthdayherochallenge
                                    </p>
                                </div>
                            </a>
                            <button data-onclick="document.querySelector('.invitation-options').showModal()" className="px-4 py-2 bg-custom-green text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Connect
                            </button>
                        </div>


                        <p className="text-gray-600 mb-4">
                            Hey guys! I can't wait to turn 20 this year as I impact lives
                            through My Hunger Hero Challenge.
                        </p>


                        <div className="post-carousel">
                            <div className="relative h-[400px]">

                                <div className="carousel-images relative h-full overflow-hidden rounded-lg">

                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 1, zIndex: 10}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday1.jpg" alt="Event Image 1" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday2.jpg" alt="Event Image 2" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday3.jpg" alt="Event Image 3" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday4.jpg" alt="Event Image 4" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="carousel-image absolute inset-0 transition-opacity duration-500 ease-in-out" style={{opacity: 0, zIndex: 1}}>
                                        <img src="https://main.dx6j5bfbtiw5l.amplifyapp.com/images/birthday5.jpg" alt="Event Image 5" className="w-full h-full object-cover" />
                                    </div>


                                    <button className="prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                    </button>
                                    <button className="next-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>


                                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent z-20">
                                        <div className="flex items-end lg:items-end justify-between gap-3 lg:gap-4">

                                            <div className="flex flex-col md:flex-row gap-1 items-end">
                                                <div className="flex flex-col ml-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-white">
                                                        Birthday Hero Challenge
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
                                                        <svg className="svg-inline--fa fa-calendar-days text-custom-blue" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path></svg>
                                                        <span>1st Jan, 2025 - 31st Dec, 2029</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col lg:flex-row items-end gap-3 lg:gap-4">
                                                <div className="avatar-group flex -space-x-3 sm:-space-x-4 rtl:space-x-reverse">
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar w-8 h-8 sm:w-10 sm:h-10">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                    </div>
                                                    <div className="avatar placeholder w-8 h-8 sm:w-10 sm:h-10">
                                                        <div className="bg-gray-100 text-gray-500 w-full h-full">
                                                            <span className="text-[10px] sm:text-xs">+78</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="carousel-dots flex justify-center mt-2 space-x-2 absolute bottom-16 left-0 right-0 z-50">
                                    <button className="w-4 h-2 rounded-full bg-custom-blue"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                    <button className="w-2 h-2 rounded-full bg-gray-400"></button>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between px-6 sm:px-28 gap-8 sm:gap-4 mt-4 sm:mt-0">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                <span className="text-sm font-medium">124</span>
                                <span className="text-xs">Logs</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-custom-orange transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="text-sm font-medium">45</span>
                                <span className="text-xs">Chats</span>
                            </button>

                            <div className="flex space-x-2 md:space-x-4 z-20">
                                <div className="relative">
                                    <button className="share-profile-btn flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors" aria-label="Invite friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                                            <path d="M12 3v16"></path>
                                            <path d="m17 8-5-5-5 5"></path>
                                        </svg>
                                        <span className="text-sm font-medium">18</span>
                                        <span className="text-xs">Share</span>
                                    </button>


                                    <div className="share-options hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#25D366" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                                            </svg>
                                            WhatsApp
                                        </a>


                                        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="#0088cc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                                            </svg>
                                            Telegram
                                        </a>


                                        <a className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75V3.75zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H8.774z"></path>
                                                <path d="M1.995 6.225a.75.75 0 0 1 .75-.75H4.75v11.498c0 1.242 1.008 2.25 2.25 2.25h11.498v2.005a.75.75 0 0 1-.75.75H4.25c-1.242 0-2.25-1.008-2.25-2.25V6.225z"></path>
                                            </svg>
                                            Copy Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TempLogStories