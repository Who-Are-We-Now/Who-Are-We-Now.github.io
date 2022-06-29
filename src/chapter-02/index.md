Chapter 2: The excluded middle
---

When considered closely, the whole idea of an “official definition” of ambidexterity is dubious. Official, says who? Ambidexterity isn’t a mathematical concept; it doesn’t refer to something that has an objective meaning independent of our language and culture. In fact the term “ambidextrous” is used in various communities— not just medicine, but also sports and music, for example— and in each it means something a bit different, and is applied with different frequency. If we say that one of these communities holds a copyright on what ambidexterity means, then we’re creating a hierarchy of authority to police the term. We’re claiming, in effect, that 90% of those who say they’re ambidextrous are just wrong. Who *should* have this authority, and why?

I’m aware that this argument skirts difficult territory. We’re living through a period of “alternative facts,” conspiracy theories, and the devaluation of science by large segments of the population. I stand firmly with science. But science means paying attention to data, not ignoring it in favor of orthodoxy or preference. I also believe that good science should not abuse its privilege by trying to change the definitions of words in common use without good reason— that is, absent a clear, helpful, and objective alternative definition. In a domain where definitions are fuzzy, “scientific” language policing that tells people they’re wrong about the way they characterize themselves seems particularly troubling. It plays into the hands of those who claim science is just a kind of politics practiced by an academic elite.

I’m hardly the first to point out that handedness is a fuzzy concept. Noticing the very wide range of left-handedness estimates at the time, Hardyck and Petrinovich noted that handedness “is most appropriately regarded as a continuum”— what we might today call a “spectrum.” We don’t have continuous measures, like grip strength and hand size, in our yes/no survey data, but there are quite a few yes/no handedness questions in the survey that we can use to render a continuous “halftone” picture:

1.  Do you have a right hand?

2.  Do you have a left hand?

3.  Is your right hand bigger than your left?

4.  Is your left hand bigger than your right?

5.  Do you write with your right hand?

6.  Do you write with your left hand?

7.  Can you write equally well with your left and right hands?

8.  When you use a computer mouse or trackpad, do you tend to use your right hand?

9.  When you use a computer mouse or trackpad, do you tend to use your left hand?

10. When you cross your arms, is your right forearm on top?

11. When you cross your arms, is your left forearm on top?

12. When you clasp your hands, is your right thumb on top?

13. When you clasp your hands, is your left thumb on top?

14. When you wink, does your right eye close?

15. When you wink, does your left eye close?

16. When you type, do you usually use the right shift key?

17. When you type, do you usually use the left shift key?

18. Do you normally hold scissors in your right hand?

19. Do you normally hold scissors in your left hand?

20. Was your mother right-handed?

21. Was your mother left-handed?

22. Was your father right-handed?

23. Was your father left-handed?

24. Did you have trouble with handwriting as a child?

25. Were you made to change your dominant hand as a child?

26. Do you work in tech?

27. Do you work in the arts?

28. Are you a strong verbal communicator?

29. Do you play a musical instrument?

30. Are you good at drawing?

These are all potential “handedness correlates.” Some of the questions seem like they would relate strongly— such as whether you write with your left hand— while others are speculative and based on theories that may be bogus, such as whether you’re good at drawing or play an instrument.[^1]

You can imagine making a composite left-handedness “score” for a given respondent by counting the “yes” answers that seem to support left-handedness (“Is your left hand bigger than your right?,” “Do you write with your left hand?,” and so on). Perhaps this score could be improved on by subtracting the number of “yes” answers that argue *against* left-handedness (“Is your right hand bigger than your left?,” “Do you write with your right hand?”). Each question, then, would contribute a +1 or -1 to an overall left-handedness score. We can call that +1 or -1 number for each question its “weight” for calculating a given score.

This procedure would give a reasonable first approximation of a “left-handedness spectrum,” but it has some obvious drawbacks. Some questions, like “Do you work in tech?,” *might* be correlated with handedness, but it would be dangerous to assume so. It might be safest simply not to count them; maybe their contribution should be zero. Then, too, it seems obvious that certain questions, like “Do you write with your left hand?,” ought to count for a lot more than “Was your mother left-handed?” This suggests that the questions should have a *range* of different weights, not just the +1, 0, and -1 weights of the simpler “bookkeeping” approach. But now we’re in trouble. How to guess what the weights should be?

Luckily, we don’t have to guess. Instead, we can make use of a mathematical technique called “optimal linear estimation.” This allows us to calculate these weights directly from the data. It works because we have a cheat sheet: the whole point of the weights is to try to predict the answers to the handedness questions. A “good” set of weights for left-handedness will produce a positive score for everyone who answered “yes” to “Are you left-handed?,” and a negative score for everyone who answered “no.” There are whole branches of applied math dedicated to solving optimization problems like these. A fancier version, “nonlinear optimization,” is the foundation of most modern AI, so very much part of my day job. Linear optimization is more straightforward, though. My laptop spit out the following optimal weights for predicting strict left-handedness in about a millisecond, sorted from most positive to most negative:

![](media/image2.png){width="6.5in" height="2.8333333333333335in"}

There are no big surprises here. The hand you write with, and the hand you hold scissors with, are the strongest negative and positive predictors. Parental influence is a factor too, though much weaker, with the mother’s handedness playing a stronger role than the father’s.[^2] Questions about drawing, music, working in tech, and being a strong verbal communicator are so close to zero as to be uninformative— it doesn’t seem (at least based on people’s self-reporting) that theories about these traits being tied to handedness hold water.

Armed with this ability to determine a left-handedness score, we can now actually graph a nuanced, “halftoned” picture of left-handedness.

![](media/image5.png){width="6.5in" height="2.8333333333333335in"}

This is a histogram of left-handedness scores; for each bin, it shows the percentage of respondents who report being strictly left-handed in yellow, strictly right-handed in black, or whose responses are ambiguous (meaning that they answered “yes” to both, or “no” to both) in purple.[^3] Since there are no other possibilities, those three percentages add up to 100%.

The predictor does pretty well! When the score is low (below about 0.5), the likelihood that the respondent self-identified as strictly left-handed is virtually zero. When the score is high (above about 2.2), the likelihood that the respondent self-identified as strictly *right*-handed is virtually zero, and they’re about 85% likely to have identified as strictly left-handed.

To temper the sense that language is fuzzy and reality elusive, it’s worth pointing out the strong underlying degree of agreement these data reveal about what people *mean* when they talk about handedness. I’d argue that it’s just as real as height or grip strength. It’s just that, as with any continuous landscape we reduce to named categories— say, “short” or “tall,” “strong” or “weak”— there’s some individual “measurement error” and, often more significantly, people are bound to differ with respect to where their personal cutoffs are. There’s no obvious objective place to put the threshold distinguishing left- from right-handedness. And even when the left-handedness predictor is maxed out, about 15% of respondents still give ambiguous handedness answers. They’re not in the majority, but are they “wrong”? In cases like these, the variety of answers isn’t a human imperfection, but rather an essential feature of the way language is used to mark out and continuously renegotiate the playing field on which it operates. Without that give and take, language couldn’t evolve.

This is why I avoided putting definitions into the survey questionnaires, though that did frustrate some people— especially when, in later surveys, I used words like “intersex” and “non-monogamous,” which not everybody knows. A 64 year old woman from Houston, Texas let me have a (virtual) earful about it. “How come you did not include definitions for all these weird words? I spent a lot of time just looking up definitions. Are you just too hip to let us little people know WTF you are talking about?”

Madam: if you’re reading, I apologize. I didn’t define the words because part of the point of the survey was to find out what they actually mean to people! This is true even for seemingly boring terms like “left-handed” and “ambidextrous.” If I had tried to define them, I’d have needed to pick a definition, and then it would likely have shifted the ground of many comments toward debates about these definitions (sometimes this happened anyway), and in the yes/no section, I’d end up with some unknown number of “well, technically...” answers at odds with what people would have clicked on otherwise.

Returning to the graph— the purple “ambiguously handed” curve is particularly interesting. Remember that the weights behind calculating this strict left-handedness score are based only on predicting the responses of people who were *unambiguously* left-handed. So, when we see that people whose responses were ambiguous actually do fall in the blurry region between the strictly right-handed and strictly left-handed groups, this is powerful evidence that those respondents aren’t making mistakes or clicking at random— they really are an “excluded middle.” For most, identifying as ambiguously handed goes along with “in the middle” answers to a series of other questions relating to bodies, histories, and behaviors.

We can also compute the optimal question weights for strict right-handedness; the results are similar, though in mirror image (and notably, for reasons that will soon become clear, with less likelihood of an ambiguous response when the score is high).

![](media/image6.png){width="6.5in" height="2.8333333333333335in"}

![](media/image4.png){width="6.5in" height="2.8333333333333335in"}

Something less obvious happens if we compute the optimal question weights to predict *ambiguous* handedness (again, this is a “yes” to both, or a “no” to both handedness questions). This prediction doesn’t work as well as the left-handed or right-handed predictions, which perhaps isn’t news— since in handedness as in anything else, there are few ways to be *un*ambiguous, but many ways to be ambiguous. More surprisingly, scoring high on the “ambiguity scale” not only rules out strict right-handedness, but also does a better job of predicting strict *left*-handedness than of predicting ambiguity! This tells us that if we start with “average” answers to every question and begin to slowly modify them to increase the ambiguity score, we’ll also be increasing the left-handedness score; in fact we can overshoot, and end up in more strictly left-handed than ambiguous territory.

So in this sense, it’s more accurate to call handedness ambiguity “a little bit left-handed” than “a little bit right-handed.” That’s because right-handedness basically *is* the average; it’s the default, and variations are defined relative to it. This isn’t just a mathematical subtlety, but a basic truth about majority and minority, as we’ll find again and again.

* * *

The question weights for ambiguous handedness are broadly similar to those for strict left-handedness— with one important exception, highlighted below:

![](media/image3.png){width="6.5in" height="2.8333333333333335in"}

“Were you made to change your dominant hand as a child?” got virtually zero weight for predicting strict left-handedness, but it’s the second most positive predictor of ambiguous handedness, just behind “Do you write with your left hand?” This implies that many of the ambiguous respondents were left-handed to one degree or another in childhood, but were made to switch their dominant hand. For completeness: “Were you made to change your dominant hand as a child?” has a strong *negative* weight for the strict right-handedness predictor. So, strongly right-handed kids are made to change their dominant hand much less often— because it’s already the “right” one!

![](media/image1.png){width="6.5in" height="2.8333333333333335in"}

This difference is obvious if we separately graph the proportion of strictly right-handed people who were made to switch and the *non* strictly right-handed people who were made to switch. The full effect is probably even greater, since plenty of people’s “handedness scores” fall somewhere in the middle, even if they identify as strictly right-handed on the survey. After all, if you have some flexibility with regard to handedness as a kid, you may as well go with the right-handed majority and reap the social benefits.

In fact, depending on where, when, and how you grew up, you may be compelled to, whether by parents, siblings, teachers, nuns, or other authority figures. As a 27 year old from Phoenix, Arizona put it, “ambidextrous as a child and pushed to choose right handedness.” Or, in the words of a 54 year old from Southwith, Massachusetts, “My sister took the pencil out of my left hand, put it in my right hand, and said ‘You’re a (family name). We write with our right hands.’ I was in first or second grade. I used my right hand from there on.” It’s likely that many people who were similarly pushed to choose right-handedness didn’t notice it as kids or don’t remember it as adults; they just adapted. Latent signs of left-handedness may remain in these cases, whether the respondent is conscious of them or not.

People do tend to remember the social pressure to conform when there’s embarrassment or trauma involved, though, or when adaptation is especially hard. Those who answered “yes” to “Were you made to change your dominant hand as a child?” often had such stories to tell: “Early school teachers often taped one hand to my waist to force me to always use the other. It was strange and [embarrassing] to be selected for this punishment.”[^4]

There’s a temptation to think of this as something that used to happen long ago, in a less enlightened time. That had certainly been my assumption. A 32 year old from Long Beach, California wrote, for instance, “I believe [my mom] *did* have to change, cause people were crazy back then, so I couldn’t really answer yes or no to her handedness either way, so I just said no to both.” A 67 year old from McKinney, Texas speaks for that previous generation: “I was naturally left handed, but in 1950 you couldn’t get scissors, etc. for left handed people, so my mother forced me into using my right hand. I still do many things left handed [...] So I would, to some extent, call myself ambidextrous.”

We do see a likely age trend in the “forced to switch” question for non strictly right-handed people, suggesting that there’s a generational shift underway. The large error bars tell us that we should take this with a grain of salt though, since we’re graphing a minority of a minority. Hence the counts are low. Still, very few of the youngest strictly left-handed adult respondents reported having been made to switch— under 5% in the 18-24 bin— while the number rises past 15% above age 45. It’s possible that, with more data, we might see even higher percentages for older people. This tells us that there’s likely a change afoot in how we treat left-handed children, but also that the practice of forced switching is far from ancient history. Speaking for many, a 26 year old man from Shelburn, Indiana wrote, “I was beat by nuns as a child to change what hand I wrote with” (yes, nuns do figure in a surprising number of these accounts). That the “forced to switch” question was even asked took a number of people aback, like this 30 year old woman from Sterrett, Alabama:

> “I can’t believe the situation where I was made to change hands as a child was a question on here! I figured I was the only one in the world that my biological father spanked me when I picked things up with my left hand and until I used my right hand to pick it up with. Is there other people like me out there? I’m not alone on that?”

As the numbers show, she is very much not alone.

Altough I’m not suggesting any equivalence, there’s a striking parallel with the stories of people who have been subjected to “conversion therapy,” the pseudoscientific practice of trying to change someone’s sexual orientation through social pressure, psychology, or spiritial indoctrination. There, too, of course, the conversion attempt is always from the (“queer”) minority to the (“straight”) majority.

We have no good evidence that conversion therapy actually works. Many of the leaders and proponents of conversion programs over the years eventually admit that they themselves are still gay, and end up apologizing for putting so many other people through those programs. John Paulk, for example, wrote in [*The Advocate*](https://www.advocate.com/politics/religion/2013/04/24/john-paulk-formally-renounces-apologizes-harmful-ex-gay-movement?page=0,1) in 2013,

> “For the better part of ten years, I was an advocate and spokesman for what’s known as the ‘ex-gay movement,’ where we declared that sexual orientation could be changed through a close-knit relationship with God, intensive therapy and strong determination. At the time, I truly believed that it would happen. And while many things in my life did change as a Christian, my sexual orientation did not. [...] Today, I do not consider myself ‘ex-gay,’ and I no longer support or promote the movement. Please allow me to be clear: I do not believe that reparative therapy changes sexual orientation; in fact, it does great harm to many people.”

Paulk is just one among at least a dozen prominent “ex-ex gay” former leaders of such organizations.[^5] Clearly the question of how malleable sexual orientation may be is both ideologically charged and can have major real-life implications; we’ll revisit this topic (as well as the deep history of conversion therapy) in later chapters.

For now, we can ask the same question about handedness. Adaptation *does* seems possible for some people, especially if they’re in the middle of the spectrum, as with a 66 year old in Lakeland, Florida who wrote, “I did use both as a child, but nuns in Catholic Kindergarten changed that. Glad they did actually.” However there are also many responses like the one below, from a 31 year old in Dumont, New Jersey, suggesting that “handedness conversion therapy” on a left-handed kid often doesn’t produce a happily right-handed adult:

> “Just wanted to say thank you. So many people don’t realize that when we were forced to change our hands at a young age (“This is a right handed world”) it forever tainted handwriting/drawing ability.”

With the data we have, it’s impossible to guess how many people could have been left-handed tradespeople or visual artists, but never developed their gifts because they were forced to use their right hands. But clearly, harm has been done. It’s reassuring to see that this is happening less in the United States nowadays, though sobering to notice how recent the change is. Questions about the “natural” range and balance of handedness over a human lifetime may only be answerable in another generation, by which time we’ll perhaps have seen a whole cohort grow up without the pressure to switch. Or else, it could be that trying to find this “natural state of things” is a fool’s errand, because we’re such an inherently social species. Pressures to conform are ever-present, as are shifts in language and behavioral norms.


[^1]: Artistic tendencies have been, at times, linked to left-handedness, these being perhaps a silver lining of “aberrancy.” Ellen Forney, for instance, writes about the link (at least in the popular imagination) between creative genius and bipolar disorder in her graphic memoir, (2012)

[^2]: This is consistent with the literature. (Herron and James 1980, 171)

[^3]: The actual numerical values on the *x* axis don’t matter here; they’re just a function of the arbitrary way the weights are scaled. If the weights were all doubled, for example, then the overall score would also be doubled, but the predictions would be the same; only the proportions matter. The error bars in this histogram are calculated by rerunning the whole procedure many times with random subsets of respondents “held out,” giving us a sense of how reliable the calculation is, or more precisely much variability is due to the limited size of the sample.

[^4]: A 58 year old woman from Palmyra, New York.

[^5]: Per [Wikipedia]{.underline}](https://en.wikipedia.org/w/index.php?title=Ex-ex-gay&oldid=937789687), other prominent ex-ex gay figures include [[Günter Baum]{.underline}](https://en.wikipedia.org/wiki/G%C3%BCnter_Baum), Michael Bussee and Gary Cooper, Ben Gresham, Noe Gutierrez, [[John Smid]{.underline}](https://en.wikipedia.org/wiki/John_Smid), [[Peterson Toscano]{.underline}](https://en.wikipedia.org/wiki/Peterson_Toscano), [[Anthony Venn-Brow]{.underline}](https://en.wikipedia.org/wiki/Anthony_Venn-Brown)n, McKrae Game, and [[David Matheson](https://en.wikipedia.org/wiki/David_Matheson_(campaigner)).
