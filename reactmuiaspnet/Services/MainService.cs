using System;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;

namespace reactmuiaspnet.Services
{
    public class MainService
    {
        public static MainService? Instance { get; private set; }
        public MainService()
        {
            Instance = this;
        }
    }
}
