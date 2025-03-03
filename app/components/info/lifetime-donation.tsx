import DonationsMetricCounter from "../donations";

export default function LifetimeDonations() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Total Lifetime Donations
      </h1>
      <DonationsMetricCounter />
    </div>
  );
}
