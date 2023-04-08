## TODOs



There is a specification for its interactions and when it fails to meet that specification it is said to have failed. A cache server itself, can notice that it has failed, for example, if it runs out of memory. Alternately, other processes on the network can notice that a cache server has failed, for example, if they don't receive a timely response from the server.




A member failure starts with suspicion. Suspicion is raised when a member is unable to connect to or communicate with some other member.

If we consider the partitioned region functionality it's clear that not every member communicates with every other member. As a result, if we want to detect failure in every member, we cannot rely solely on region communication to detect failed members. In order to ensure that each member is monitored (for failure) by at least one other member, VMWare GemFire members form a health monitoring ring network in which each member is monitored by one other member.



Alternately, suspicion can be raised asynchronously when a monitoring member fails to receive any communication from a monitored member within a prescribed time period.

Health monitor keeps track of when we last heard from each a member. If it's been longer than 2.5s then 

 (`member-timeout` - `member-timeout`/`geode.logical-message-received-interval`)

`member-timeout` configuration property defaults to 5s (5000ms)
`geode.logical-message-received-interval` system property defaults to 2 (unitless)

Membership.suspectMember()
 called on client-side when P2P can't connect to member
 called on client-side when a P2P connection cannot be established
 called on server-side when a shared+ordered P2P connection closes unexpectedly, i.e. not during shutdown
 called on client-side when distributed lock acknowledgement doesn't arrive in time

 calls GMSHealthMonitor.checkIfAvailable()
   calls inlineCheckIfAvailable()
   member state becomes "suspected"
   if member has a failure detection port
     calls doCheckMember() to send heartbeat request but NOT wait for reply
     calls doTCPCheckMember() to connect to failure detection port
   else
     calls doCheckMember() to send heartbeat request and wait for reply
   if no immediate response to the request we just sent
     if no communication has been recently received from member
       if this is the final check
         GMSJoinLeave.remove(member)
       else
         if the LOCAL MEMBER passes doTCPCheckMember(THE LOCAL MEMBER)
           

     

TODO: analyze:
* Membership.suspectMember() is the route by which P2P suspects a member
* GMSJoinLeave.memberSuspected()
* GMSHealthMonitor.initiateSuspicion()
* GMSJoinLeave.forceDisconnect()

? what is sequence of processing when we run out of memory?
? what process initiates suspicion: self vs others
? what specification was violated: primary product function vs synthetic operation e.g. missed heartbeat
? trace RemoveMemberMessage




overview

what problem are we solving?
* a distributed system
* types of failure
 * power failure
 * network partition
 * memory exhaustion
 * CPU overload
* ramifications of undetected failure
 * inability to update a region entry (due to loss of function on member hosting primary bucket)
 * loss of data redundancy (due to loss of function on member hosting secondary bucket storage)
 * data loss (due to loss of function on members hosting primary and secondary bucket storage)
* distribution, without failure detection, does not increase system reliability
 * in general, the higher the redundancy (without failure detection) the more likely it is that one component will fail
 * redundancy + failure detection is the magic formula for better reliability

what are the pieces and what are their roles
* members (locators, cache servers)
* health monitoring topology: ring
* triggering events:
  * missed heartbeat
  * lack of timely response
  * unexpected connection closure
* suspicion, perspective, escalation, second chances, forced-disconnect

failure scenarios

tuning parameters



reviewing the existing docs

"failure detection" is placed inside the discusion of "network partitioning"

https://docs.vmware.com/en/VMware-GemFire/10.0/gf/managing-network_partitioning-chapter_overview.html
https://docs.vmware.com/en/VMware-GemFire/10.0/gf/managing-network_partitioning-failure_detection.html


Interesting quotes:

"It is elusive to build large software that never fails. Designers
of robust systems therefore must devise runtime mechanisms
that proactively check whether a program is still functioning
properly, and react if not. Many of these mechanisms are built
with a simple assumption that when a program fails, it fails
completely via crash, abort, or network disconnection.

This assumption, however, does not reflect the complex
failure semantics exhibited in modern cloud infrastructure."[1]

[1] https://www.usenix.org/system/files/nsdi20-paper-lou.pdf


Let's describe a scenario where some member is unable to connect to another member in the view. Describe the escalation process for that.

In the failure scenario we just examined, the health monitor was alerted when a member was unable to connect to another member as part of partitioned region bucket operation.


Ways a member can leave the cluster: 
* leave: administrator uses gfsh command to remove a member from the cluster
* forced-disconnect: health monitor decides the member has failed and removes it from the cluster and instructs it to shut down
* crash: segmentation fault, low-level software fault, loss of power, hardware failure

Triggering conditions: look at GMSHealthMonitor.inlineCheckIfAvailable(final ID initiator,
      final GMSMembershipView<ID> cv, boolean isFinalCheck, final ID mbr,
      final String reason)
Then abstract these into a short list of condition categories

broadly two types of precipitating event:
* some m
