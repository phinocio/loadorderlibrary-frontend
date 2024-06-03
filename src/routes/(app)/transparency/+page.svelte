<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Transparency - Load Order Library</title>

	<meta name="description" content="A modlist files site to help with support." />

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Transparency - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Transparency - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<div class="mb-4 flex flex-col md:flex-row md:justify-between">
	<h1 class="text-3xl font-bold">Transparency</h1>
	<p>Last Updated: 2024-06-03</p>
</div>

<div class="space-y-4">
	<h2 class="text-2xl font-bold">Expenses</h2>
	<p><strong>TLDR:</strong> $403.20 USD/yr + $19.94 CAD/yr</p>
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
					<td class="p-2">$33.60 USD/month</td>
					<td class="p-2"
						>Server for hosting the main site, API, and testing site. $28 for droplet, $5.60 for backup
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
					<td class="p-2">$403.20 USD/yr + $19.94 CAD/yr</td>
					<td class="p-2"
						>USD -> CAD conversion varies too much to be 100% accurate, so listing USD + CAD is best.</td
					>
				</tr>
			</tbody>
		</table>
	</div>

	<h2 class="text-2xl font-bold">Income</h2>
	<p><strong>TLDR:</strong> $148.95 CAD lifetime</p>
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
					<td class="p-2 pl-4">March 2024 - May 2024</td>
					<td class="p-2">$0.00 CAD</td>
					<td class="p-2">All Sources</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">February 2024</td>
					<td class="p-2">$5.00 CAD</td>
					<td class="p-2">Ko-fi</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">January 2023</td>
					<td class="p-2">$0.00 CAD</td>
					<td class="p-2">All Sources</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="text-center font-bold" colspan="3">New Year 2024</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">December 2023</td>
					<td class="p-2">$1.12 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">November 2023</td>
					<td class="p-2">$1.11 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">October 2023</td>
					<td class="p-2">$1.08 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">October 2023</td>
					<td class="p-2">$5.00 CAD</td>
					<td class="p-2">Ko-fi</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">September 2023</td>
					<td class="p-2">$2.22 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">August 2023</td>
					<td class="p-2">$2.20 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">July 2023</td>
					<td class="p-2">$1.08 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">June 2023</td>
					<td class="p-2">$6.63 CAD</td>
					<td class="p-2">Patreon</td>
				</tr>
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
					<td class="p-2 pl-4">January 2022 - August 2022</td>
					<td class="p-2">$0.00 CAD</td>
					<td class="p-2">All sources</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="text-center font-bold" colspan="3">New Year 2022</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">December 2021</td>
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
					<td class="p-2">$148.95 CAD</td>
					<td class="p-2"></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
