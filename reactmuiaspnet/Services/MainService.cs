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
