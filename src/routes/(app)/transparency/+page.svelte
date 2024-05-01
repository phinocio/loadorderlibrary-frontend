<svelte:head>
	<title>Transparency - Load Order Library</title>
</svelte:head>

<div class="flex items-center justify-between">
	<h1 class="mb-4 text-3xl font-bold">Transparency</h1>
	<p>Last Updated: 2023-05-01</p>
</div>

<div class="space-y-4">
	<h2 class="text-2xl font-bold">Expenses</h2>
	<p><strong>TLDR:</strong> $86.40 USD/yr + $19.94 CAD/yr</p>
	<p>NOTE: Prices are listed without applicable taxes.</p>
	<div class="rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]">
		<table class="w-full table-auto border-collapse">
			<thead>
				<tr class="text-left text-xl">
					<th class="p-2 pl-4">Service</th>
					<th class="p-2">Price</th>
					<th class="w-1/2 p-2">Purpose</th>
				</tr>
			</thead>
			<tbody class="bg-light dark:bg-dark">
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Digital Ocean</td>
					<td class="p-2">$7.20 USD/month</td>
					<td class="p-2"
						>Server for hosting the main site, API, and testing site. $6 for droplet, $1.20 for backup
						service.</td
					>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Domain Name</td>
					<td class="p-2">$19.94 CAD/year</td>
					<td class="p-2"
						>The domain name itself, registered with Namecheap. $19.70 domain + $0.24 ICANN fee</td
					>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4 font-bold">Total</td>
					<td class="p-2">$86.40 USD/yr + $19.94 CAD/yr</td>
					<td class="p-2"
						>USD -> CAD conversion varies too much to be 100% accurate, so listing USD + CAD is best.</td
					>
				</tr>
			</tbody>
		</table>
	</div>

	<h2 class="text-2xl font-bold">Income</h2>
	<p><strong>TLDR:</strong> $123.51 CAD lifetime</p>
	<p>
		NOTE: Not in the table is 0.0021051 ETH received on July 26, 2021 as I no longer accept cryptocurrency
		donations.
	</p>
	<div class="rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]">
		<table class="w-full table-auto border-collapse">
			<thead>
				<tr class="text-left text-xl">
					<th class="p-2 pl-4">Date</th>
					<th class="p-2">Income</th>
					<th class="p-2">Source</th>
				</tr>
			</thead>
			<tbody class="bg-light dark:bg-dark">
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">May 2023</td>
					<td class="p-2">$7.18 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">April 2023</td>
					<td class="p-2">$7.16 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">March 2023</td>
					<td class="p-2">$7.16 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">February 2023</td>
					<td class="p-2">$7.07 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">January 2023</td>
					<td class="p-2">$7.14 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">January 2023</td>
					<td class="p-2">$20 CAD</td>
					<td class="p-2">Ko-fi</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="text-center font-bold" colspan="3">New Year 2023</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">December 2022</td>
					<td class="p-2">$7.08 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">November 2022</td>
					<td class="p-2">$7.15 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">November 2022</td>
					<td class="p-2">$2.00 CAD</td>
					<td class="p-2">Ko-fi</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">October 2022</td>
					<td class="p-2">$7.14 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">September 2022</td>
					<td class="p-2">$40.00 CAD</td>
					<td class="p-2">Ko-fi</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="text-center font-bold" colspan="3">New Year 2022</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">December 2021 - August 2022</td>
					<td class="p-2">$0.00 CAD</td>
					<td class="p-2">All sources</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">November 2021</td>
					<td class="p-2">$1.07 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">October 2021</td>
					<td class="p-2">$1.11 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">September 2021</td>
					<td class="p-2">$1.13 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">August 2021</td>
					<td class="p-2">$1.12 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4 font-bold">Total</td>
					<td class="p-2">$123.51 CAD</td>
					<td class="p-2"></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
