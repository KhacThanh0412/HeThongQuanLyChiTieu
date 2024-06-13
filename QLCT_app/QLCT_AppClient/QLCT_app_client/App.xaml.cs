namespace QLCT_app_client;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();
	}

    protected override Window CreateWindow(IActivationState activationState)
    {
        MainPage = new AppShell();
        return base.CreateWindow(activationState);
    }
}

