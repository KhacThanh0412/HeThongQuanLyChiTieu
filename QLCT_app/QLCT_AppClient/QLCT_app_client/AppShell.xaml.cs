namespace QLCT_app_client;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();
	}

    protected override void OnAppearing()
    {
        base.OnAppearing();
    }

    protected override void OnNavigated(ShellNavigatedEventArgs args)
    {
        base.OnNavigated(args);
    }

    protected override bool OnBackButtonPressed()
    {
        return base.OnBackButtonPressed();
    }
}