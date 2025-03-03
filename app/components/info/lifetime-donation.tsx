import DonationsMetricCounter from "../donations";

export default function LifetimeDonations() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-xl md:text-3xl font-bold text-green-800 mb-8">
        Total Lifetime Donations
      </h1>
      <DonationsMetricCounter />
    </div>
  );
}
